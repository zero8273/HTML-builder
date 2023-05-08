const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, (err, files) => {
  //   console.log(files);
  files.forEach((file) => {
    let fileNow = path.join(dirPath, file);

    fs.stat(fileNow, (err, status) => {
      if (status.isFile()) {
        const { name, ext } = path.parse(file);
        console.log(`${name} - ${ext.slice(1)}`);
      } else {
      }
    });
  });
});
