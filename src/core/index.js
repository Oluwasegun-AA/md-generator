#!/usr/bin/env node
import program from 'commander';
import pad from 'pad';
import { showHelpOnError, filterCurrentRequest, useBox } from './utils/index';
import { log } from '../utils/index';
import validateOptions from './validations/validateOptions';

program
  .name('md-generator')
  .version('1.0.0')
  .on('--help', () => {
    log('\n\nCommand-Options :');
    log('Usage: md-generator [commands] [command-options]\n');
    log(pad('-A, --all', 25), 'Operate on all required/optional .md files');
    log(pad('-F, --file', 25), 'Operate on specific .md files');
    log(pad('-E, --empty', 25), 'make added files empty');
    log(pad('-R --required', 25), 'Operate on required files');
    log(pad('-O --optional', 25), 'Operate on optional files');
  });
program
  .command('list [env]')
  .description('list All Required/optional .md files')
  .option('-O --optional', 'make added files empty')
  .option('-R --required', 'make added files empty')
  .action((type, args) => {
    validateOptions(args);
    // log(program.opts());
  });
program
  .command('create [env]')
  .description('create All/specific files')
  .option('-O, --optional', 'make added files empty')
  .option('-R, --required', 'make added files empty')
  .option('-A, --all [value]', 'Generate all required/optional .md files')
  .option('-F, --file [value]', 'Generate specific .md files')
  .option('-E, --empty', 'make added files empty')
  .action((type, args) => {
    validateOptions(args);
  });
program
  .command('check [env]')
  .description('check for missing .md files')
  .action((type, args) => {
    validateOptions(args);
    // console.log(type);
    // console.log(args)
    // filterCurrentRequest();
    // showHelpOnError();
    // log(program.opts());
  });
program
  .command('remove [env]')
  .description('remove All/specific .md files')
  .option('-A, --all [value]')
  .option('-F, --file [value]', 'Generate specific .md files')
  .action((type, args) => {
    validateOptions(args);
  });
program
  .command('import [env]')
  .description('import .md files from remote repository')
  .option('-A, --all [value]', 'Generate all required/optional .md files')
  .option('-F, --file [value]', 'Generate specific .md files')
  .option('-E, --empty', 'make added files empty')
  .action((type, args) => {
    validateOptions(args);
  });

program.parse(process.argv);
