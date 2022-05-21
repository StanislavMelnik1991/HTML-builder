const fs = require('fs');
const path = require('path');

async function dirContain(dir){
  fs.promises.readdir(dir, {withFileTypes: true})
    .then((filenames) => {
      for (let file of filenames) {
        const name = path.basename(file.name, path.extname(file.name));
        const extname = path.extname(file.name).split('').splice(1, path.extname(file.name).length-1).join('');
        if (file.isFile()) {
          fs.stat(dir+'\\'+file.name, (error, stats) => {
            if (error) {
              console.log(error);
            }
            else {
              const statFile = (stats.size / 1024) + ' kb';
              console.log(name + ' - ' + extname + ' - ' + statFile);
            }});
        }
        // хз, надо ли читать файлы внутри вложенных папок, но добавлю на всякий случай
        else{
          dirContain(path.join(dir, file.name));
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}
dirContain(path.join(__dirname, 'secret-folder'));