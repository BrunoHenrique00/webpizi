import { readdirSync, statSync } from 'fs';
import { extname } from 'path';
import sharp from 'sharp';
import prompts from 'prompts';

const globalDir = `${__dirname}/../../`;
const options = {
  imageFormats: ['.jpg', '.png'],
  deepSearch: false,
  overrides: false,
  dir: '',
};

const getAllImages = async (path: string) => {
  try {
    const result = readdirSync(`${globalDir}/${path}`);

    const promises = result.map(
      async file =>
        new Promise((resolve, reject) => {
          if (
            statSync(`${globalDir}/${path}/${file}`).isDirectory() &&
            options.deepSearch
          ) {
            getAllImages(`${path}/${file}`);
            return;
          }

          const fileExtension = extname(file);
          if (!fileExtension || !options.imageFormats.includes(fileExtension)) {
            reject();
            return;
          }

          const pathToSave = `${globalDir}/${path}/${file.replace(
            fileExtension,
            '',
          )}.webp`;
          // console.log(`global: ${globalDir}/${path}/${file}`);
          // console.log('Path ', pathToSave);
          sharp(`${globalDir}/${path}/${file}`)
            .toFile(pathToSave)
            .then(() => resolve(true));

          console.log(`Converted image ${file} found on : ${path}`);
        }),
    );
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

export default async function parseLocal() {
  const result = readdirSync(`${globalDir}/`);
  const parsedPaths = result
    .filter(path => statSync(path).isDirectory())
    .map(path => ({
      title: path,
      value: path,
    }));

  const { folder } = await prompts({
    type: 'select',
    name: 'folder',
    message: 'Choose which folder you wanna parse the images.',
    choices: parsedPaths,
  });

  const { deep } = await prompts({
    type: 'confirm',
    name: 'deep',
    message: `Do you want to parse the image in nested folders inside ${folder}?`,
  });

  if (deep) options.deepSearch = true;

  getAllImages(folder);
}
