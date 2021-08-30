const shell = require('shelljs');

if (!process.env.PROJECT) {
  console.error(`Set PROJECT env var to build the project.`);
} else if (process.env.PROJECT === 'demo-be') {
  console.log(`The branch is master`);
  if (shell.exec('nx build demo-be --prod').code !== 0) {
    shell.exit(1);
  }
} else {
  console.log(`Project '${process.env.PROJECT}' start not implemented.`);
}
