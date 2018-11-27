
import child_process from 'child_process';
const { spawn } = child_process;

const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', data => console.log(`stdout: ${data}`));
ls.stderr.on('data', data => console.log(`stderr: ${data}`));
ls.on('close', code => code && console.log(`child process exited with code ${code}.`));
