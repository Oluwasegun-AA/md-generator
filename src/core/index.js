#!/usr/bin/env node
import program from 'commander';
// import { showHelpOnError, filterCurrentRequest, useBox } from './utils/index';
import { log, customHelp } from '../utils/index';
import validateOptions from './validations/validateOptions';

program
  .name('md-generator')
  .version('1.0.0')
  .on('--help', () => {
    customHelp();
  });
program
  .command('list [env]')
  .description('list All Required/optional .md files')
  .option('-O --optional', 'list all optional files')
  .option('-R --required', 'list all required files')
  .action((type, args) => {
    validateOptions(args);
    // log(program.opts());
  });
program
  .command('create [env]')
  .description('create All/specific files')
  .option('-O, --optional', 'create all optional files')
  .option('-R, --required', 'create all required files')
  .option('-A, --all [value]', 'create all required/optional .md files')
  .option('-F, --file [value]', 'Create specific .md files')
  .option('-E, --empty', 'make created files empty')
  .action((type, args) => {
    validateOptions(args);
  });
program
  .command('check [env]')
  .description('check for missing .md files')
  .option('-O, --optional', 'check all optional files')
  .option('-R, --required', 'check all required files')
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
  .option('-A, --all [value]', 'remove all .md files')
  .option('-F, --file [value]', 'remove specific .md files')
  .action((type, args) => {
    validateOptions(args);
  });
program
  .command('import [env]')
  .description('import .md files from remote repository')
  .option(
    '-A, --all [value]',
    'Import all required/optional .md files from remote repo'
  )
  .option('-F, --file [value]', 'import specific .md files from remote repo')
  .option('-E, --empty', 'make imported files empty')
  .action((type, args) => {
    validateOptions(args);
  });

program.parse(process.argv);
