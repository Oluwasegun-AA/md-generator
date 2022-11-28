#!/usr/bin/env node
import program from 'commander';
import { customHelp, wrongCommandAlert, noCommandAlert } from './common/index';
import handleCommand from './core/validations/ValidateOptions';

program
  .name('md-generator')
  .version('0.5.2')
  .action((command: string) => wrongCommandAlert(command))
  .on('--help', () => {
    customHelp();
  });

program
  .command('list [env]')
  .description('list All Required/optional .md files')
  .option('-O --optional', 'list all optional files')
  .option('-R --required', 'list all required files')
  .action((_type: any, args: any) => {
    handleCommand(args);
  });

program
  .command('create [env]')
  .description('create All/specific files')
  .option('-O, --optional', 'create all optional files')
  .option('-R, --required', 'create all required files')
  .option('-A, --all [value]', 'create all required/optional .md files')
  .option('-F, --file [value]', 'Create specific .md files')
  .option('-E, --empty', 'make created files empty')
  .action((_type: any, args: any) => {
    handleCommand(args);
  });

program
  .command('check [env]')
  .description('check for missing .md files')
  .option('-O, --optional', 'check all optional files')
  .option('-R, --required', 'check all required files')
  .action((_type: any, args: any) => {
    handleCommand(args);
  });

program
  .command('remove [env]')
  .description('remove All/specific .md files')
  .option('-A, --all', 'remove all .md files')
  .option('-O, --optional', 'remove all optional files')
  .option('-R, --required', 'remove all required files')
  .option('-F, --file [value]', 'remove specific .md files')
  .action((_type: any, args: any) => {
    handleCommand(args);
  });

if (!process.argv[2]) noCommandAlert();

program.parse(process.argv);
