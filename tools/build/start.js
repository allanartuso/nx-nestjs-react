const shell = require('shelljs');

if (!process.env.PROJECT) {
  console.error(`Set PROJECT env var to build the project.`);
} else if (process.env.PROJECT === 'demo-be') {
  if (shell.exec('node dist/apps/demo-be/main.js').code !== 0) {
    shell.exit(1);
  }
} else {
  console.log(`Project '${process.env.PROJECT}' build not implemented.`);
}
