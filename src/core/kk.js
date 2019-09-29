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
