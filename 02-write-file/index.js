const fs = require('fs');
const path = require('path');
const { stdin, stdout, stderr } = process;

class CreateFile {
  constructor(fileName) {
    this.fileName = fileName + '.txt';
  }
  
  init() {
    console.log('введите текст');
    stdin.on('data', data => {
      fs.writeFile(
        path.join(__dirname, this.fileName),
        data,
        (err) => {
          if (err) throw err;
          stdin.removeAllListeners('data');
          this.edit();
        }
      );
    });
  }
  edit() {
    stdin.on('data', data => {
      if (data.toString().substring(0, data.toString().length - 2) === 'exit') {
        process.exit();
      }
      fs.appendFile(
        path.join(__dirname, this.fileName),
        data,
        err => {
          if (err) throw err;
        },
      );
    });
  }
}
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', code => {
  if (code === 0) {
    stdout.write('Данные сохранены');
  } else {
    stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});
process.on('SIGINT', () => {
  process.exit();
});

const file = new CreateFile('tmp');
file.init();