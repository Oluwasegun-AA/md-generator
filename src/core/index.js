#!/usr/bin/env node
import program from 'commander';
import { showHelpOnError, filterCurrentRequest, useBox } from './utils/index';
import { log } from '../utils/index';

program
  .name('md-generator')
  .version('1.0.0')
  .option('--optional', 'Optional .md Files')
  .option('--required', 'Required .md Files')
  .option('-A, --all [value]', 'All .md files')
  .option('-F, --file [value]', 'Specific .md files')
  .option('-E, --empty', 'make added files empty');
program
  .command('list')
  .description('list All Required/optional .md files')
  .allowUnknownOption()
  // .option('--optional', 'make added files empty')
  // .option('--required', 'make added files empty')
  .action((type, args) => {
    log(type._name);
    // console.log(type);
    // console.log(args)
    // filterCurrentRequest();
    // showHelpOnError(type.parent.rawArgs[3]);
  });
program
  .command('create [env]')
  .description('create All/specific files')
  .allowUnknownOption()
  // .option('--optional', 'make added files empty')
  // .option('--required', 'make added files empty')
  // .option('-A, --all [value]', 'Generate all required/optional .md files')
  // .option('-F, --file [value]', 'Generate specific .md files')
  // .option('-E, --empty', 'make added files empty')
  .action((type, args) => {
    log(program.opts());
    log('create');
    // filterCurrentRequest();
    showHelpOnError(type.parent.rawArgs[3]);
  });
program
  .command('check [env]')
  .description('check for missing .md files')
  .allowUnknownOption()
  .action((type, args) => {
    log('check');
    // filterCurrentRequest();
    showHelpOnError(type.parent.rawArgs[3]);
    // log(program.opts());
  });
program
  .command('remove [env]')
  .description('remove All/specific .md files')
  .allowUnknownOption()
  // .option('-A, --all [value]')
  // .option('-F, --file [value]', 'Generate specific .md files')
  .action((type, args) => {
    log(program.opts());
    log('remove');
    // filterCurrentRequest();
    showHelpOnError(type.parent.rawArgs[3]);
    // log(program.opts());
  });
program
  .command('import [env]')
  .description('import .md files from remote repository')
  // .option('-A, --all [value]', 'Generate all required/optional .md files')
  // .option('-F, --file [value]', 'Generate specific .md files')
  // .option('-E, --empty', 'make added files empty')
  .allowUnknownOption()
  .action((type, args) => {
    log(program.opts());
    log('import');
    // filterCurrentRequest();
    showHelpOnError(type.parent.rawArgs[3]);
    // log(program.opts());
  });

program.command('*').action(cmd => {
  log(`Invalid command:  ${cmd}  \n See --help for a list of available commands.`);
});

program.parse(process.argv);
