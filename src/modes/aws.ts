import { S3 } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { writeFileSync } from 'fs';
import prompts from 'prompts';
import awsRegions from '../constants/aws-regions';

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
    const promises = files.Contents?.map(async file => {
      const { Body } = await client.getObject({
        Bucket: bucket,
        Key: file.Key,
      });

      if (Body) {
        const buffer = Buffer.concat([await Body.transformToByteArray()]);

        writeFileSync(`${__dirname}/../../test/aws-${file.Key}`, buffer);
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
