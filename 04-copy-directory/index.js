const fs = require('fs');
const path = require('path');

async function copyDirContain(src, dest){
  fs.promises.readdir(src, {withFileTypes: true})
    .then((filenames) => {
      fs.mkdir(dest,{recursive: true}, err => {
        if (err) throw err;
      });
      for (let file of filenames) {
        if (file.isFile()) {
          fs.copyFile(src+'\\'+file.name, dest+'\\'+file.name, err=>{if (err) throw err;});
        }
        else{
          copyDirContain(path.join(src, file.name), path.join(dest, file.name));
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
}
copyDirContain(path.join(__dirname, 'files'),path.join(__dirname, 'files-copy'));