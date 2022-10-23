#!/usr/bin/env node
import prompts from 'prompts';
import parseAws from './modes/aws';
import parseLocal from './modes/local';

type Modes = {
  [key: string]: () => void;
};

const modes: Modes = {
  aws: parseAws,
  local: parseLocal,
};

const run = async () => {
  const { mode } = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Where to parse the images?',
    choices: [
      { title: 'Images on AWS Buckets', value: 'aws' },
      { title: 'Images locally', value: 'local' },
    ],
  });

  modes[mode]();
};
run();
