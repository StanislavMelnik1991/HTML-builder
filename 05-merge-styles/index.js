const fs = require('fs');
const path = require('path');

async function copyDirContain(src, dest){
  fs.promises.readdir(src, {withFileTypes: true})
    .then((filenames) => {
      fs.mkdir(dest,{recursive: true}, err => { if (err) throw err; });
      fs.writeFile(path.join(dest, 'bundle.css'), '/* file was created automatically using "05-merge-styles scrypt" */\n', (err) => { if (err) throw err; });
      for (let file of filenames) {
        if (file.isFile()) {
          if (path.extname(file.name) === '.css') {
            const input = fs.createReadStream(path.join(src, file.name), 'utf-8');
            console.log(file.name + ' complete');
            input.on('data', (chunk) => {
              fs.appendFile(
                path.join(dest, 'bundle.css'),
                chunk,
                err => {
                  if (err) throw err;
                },
              );
            });
          }
        }
        else{
          copyDirContain(path.join(src, file.name), dest);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}
copyDirContain(path.join(__dirname, 'styles'),path.join(__dirname, 'project-dist'));