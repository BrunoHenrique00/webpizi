#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { extname } from 'path';
import sharp from 'sharp';
import { Command } from 'commander';

const globalDir = `${__dirname}/..`;
const options = {
  imageFormats: ['.jpg', '.png'],
  deepSearch: true,
  overrides: false,
};

const dir = 'test';

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
          console.log(`global: ${globalDir}/${path}/${file}`);
          console.log('Path ', pathToSave);
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

const program = new Command();
program
  .name('webpizi')
  .description('CLI to parse images to .webp')
  .version('0.1.0');

program
  .command('parse')
  .description('Will convert images on the current directory to .webp')
  .option('-d', '--deep', false)
  .action(optionsCli => {
    options.deepSearch = optionsCli.d;
    getAllImages(dir);
  });

program.parse();
