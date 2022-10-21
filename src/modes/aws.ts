import { S3 } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { extname } from 'path';
import prompts from 'prompts';
import awsRegions from '../constants/aws-regions';
import imageFormats from '../constants/imageFormats';
import toWebP from '../utils/toWebP';

export default async function parseAws() {
  const { region } = await prompts({
    type: 'autocomplete',
    name: 'region',
    message: 'Choose a region!',
    choices: awsRegions.map(_region => ({
      title: _region,
      value: _region,
    })),
  });

  const client = new S3({
    region,
    credentials: fromIni({ profile: 'bruno' }),
  });
  const { Buckets } = await client.listBuckets({});
  if (!Buckets) {
    console.log(`There is no Buckets on: ${region}`);
    return;
  }
  const { bucket } = await prompts({
    type: 'autocomplete',
    name: 'bucket',
    message: 'Choose a bucket to parse the images!',
    choices: Buckets.map(_bucket => ({
      title: _bucket.Name || 'This Bucket has no name :(',
      value: _bucket.Name,
    })),
  });

  try {
    const files = await client.listObjects({ Bucket: bucket });

    if (!files.Contents) {
      console.log(`There is no files on: ${bucket}`);
      return;
    }

    const filesFiltered = files.Contents.filter(file => {
      const fileExtension = extname(file.Key || '');
      return imageFormats.includes(fileExtension);
    });

    console.log(`Found ${filesFiltered.length} images to parse.`);

    const promises = filesFiltered.map(async (file, index) => {
      const { Body } = await client.getObject({
        Bucket: bucket,
        Key: file.Key,
      });

      if (Body) {
        const buffer = await Body.transformToByteArray();
        toWebP({
          buffer,
          onData: async data => {
            await client.putObject({
              Bucket: bucket,
              Key: `${file.Key}`,
              Body: data,
            });
            console.log(`${index + 1} Images parsed.`);
          },
        });
      }
    });

    if (promises) await Promise.all(promises);
  } catch (error: any) {
    if (error.Code === 'PermanentRedirect') {
      console.error(
        `It seems that the bucket ${bucket} is not in this region -> ${region}`,
      );
      return;
    }
    console.error('Something went wrong, try again!', error);
  }
}
