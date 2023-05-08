const fs = require('fs');
const path = require('path');

const newDirPath = path.join(__dirname, 'files-copy');
const dirPath = path.join(__dirname, 'files');

fs.rm(newDirPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.mkdir(newDirPath, () => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach((file) => {
        let fileNow = path.join(dirPath, file);
        fs.readFile(fileNow, 'utf-8', (err, data) => {
          let newFilePath = path.join(newDirPath, file);
          fs.writeFile(newFilePath, data, () => {});
        });
      });
    });
  });
});
