#!/usr/bin/env node
import program from 'commander';
import { customHelp, wrongCommandAlert, noCommandAlert } from '../common/index';
import validateOptions from './validations/validateOptions';

program
  .name('md-generator')
  .version('1.0.0')
  .command('*')
  .action(command => wrongCommandAlert(command))
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
  });

program
  .command('remove [env]')
  .description('remove All/specific .md files')
  .option('-A, --all', 'remove all .md files')
  .option('-O, --optional', 'remove all optional files')
  .option('-R, --required', 'remove all required files')
  .option('-F, --file [value]', 'remove specific .md files')
  .action((type, args) => {
    validateOptions(args);
  });

program
  .command('import [env]')
  .description('import .md files from remote repository')
  .option(
    '-A, --all',
    'Import all required/optional .md files from remote repo'
  )
  .option('-F, --file [value]', 'import specific .md files from remote repo')
  .option('-E, --empty', 'make imported files empty')
  .action((type, args) => {
    validateOptions(args);
  });

if (!process.argv[2]) noCommandAlert();

program.parse(process.argv);
