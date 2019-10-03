const program = require('commander');

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('create [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .action(function(env, options) {
    const mode = options.setup_mode || 'normal';
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .action(function(cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  })

program.command('*').action(function(env) {
  console.log('deploying "%s"', env);
});

program.parse(process.argv);







// // #!/usr/bin/env node
// import program from 'commander';
// import { showHelpOnError, useBox } from './utils/index';
// import { log } from '../utils/index';
// import validateOptions from './validations/validateOptions';

// program
//   .name('md-generator')
//   .version('1.0.0')
//   .option('--optional', 'Optional .md Files')
//   .option('--required', 'Required .md Files')
//   .option('-A, --all [value]', 'All .md files')
//   .option('-F, --file [value]', 'Specific .md files')
//   .option('-E, --empty', 'make added files empty');
// program
//   .command('list')
//   .description('list All Required/optional .md files')
//   .action((type, args) => {
//     log(type._name);
//     log(program.opts());
//     validateOptions(type);
//   });
// program
//   .command('create')
//   .description('create All/specific files')
//   .action((type, args) => {
//     log(program.opts());
//     validateOptions(type);
//     showHelpOnError(type);
//   });
// program
//   .command('check')
//   .description('check for missing .md files')
//   .action((type, args) => {
//     validateOptions(type);
//     showHelpOnError(type);
//     log(program.opts());
//   });
// program
//   .command('remove')
//   .description('remove All/specific .md files')
//   .action((type, args) => {
//     log(program.opts());
//     log('remove');
//     validateOptions(type);
//     showHelpOnError(type);
//     // log(program.opts());
//   });
// program
//   .command('import')
//   .description('import .md files from remote repository')
//   // .option('-A, --all [value]', 'Generate all required/optional .md files')
//   // .option('-F, --file [value]', 'Generate specific .md files')
//   // .option('-E, --empty', 'make added files empty')
//   .action((type, args) => {
//     log(program.opts());
//     validateOptions(type);
//     showHelpOnError(type);
//     // log(program.opts());
//   });

// program.command('*').action(cmd => {
//   log(`Invalid command:  ${cmd}  \n See --help for a list of available commands.`);
// });

// program.parse(process.argv);

