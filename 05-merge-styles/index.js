const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.readdir(dirPath, (err, files) => {
  //   console.log(files);
  const writeStream = fs.createWriteStream(projectPath);
  files.forEach((file) => {
    let fileNow = path.join(dirPath, file);

    fs.stat(fileNow, (err, status) => {
      if (status.isFile()) {
        const { name, ext } = path.parse(file);
        if (ext === '.css') {
          const readStream = fs.createReadStream(fileNow);

          readStream.pipe(writeStream);
        }
      } else {
      }
    });
  });
});
