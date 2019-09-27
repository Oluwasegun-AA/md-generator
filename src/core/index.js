#!/usr/bin/env node
import program from 'commander';
import { showHelpOnError, filterCurrentRequest, useBox } from './utils/index';

program
  .name('md-generate')
  .allowUnknownOption()
  .version('1.0.0')
  .option('-A, --all [value]', 'Generate all required/optional .md files')
  .option('-F, --file [value]', 'Generate specific .md files')
  .option('-C, --check', 'check for missing md files')
  .option('-R, --remove-all', 'remove all .md files')
  .option('--remove-file', 'remove specific .md files')
  .option(
    '-i, --include-remote-file [value]',
    'add a specific .md file from a remote repository'
  )
  .option('-E, --empty', 'make added files empty')
  .on('option:*', () => {
    console.error(
      'Invalid command: %s\nSee --help for a list of available commands.',
      program.args.join(' ')
    );
    process.exit(1);
  })
  .action(() => {
    filterCurrentRequest();
    showHelpOnError();
    console.log(program.opts());
  })
  .parse(process.argv);
