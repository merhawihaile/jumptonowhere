const { execSync } = require('child_process');

function run(cmd) {
  try {
    console.log(`\n> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Command failed: ${cmd}`);
    process.exit(1);
  }
}

run('npm install --prefix editor');
run('npm test --prefix editor');
run('npm run build --prefix editor');
require('./server');
