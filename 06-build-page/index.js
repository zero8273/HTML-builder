const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'styles');
const newDirPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');
const componentDirPath = path.join(__dirname, 'components');
const projectPath = path.join(__dirname, 'project-dist', 'style.css');

fs.mkdir(newDirPath, () => {});

const regular = /{{(.*?)}}/g;

fs.readFile(templatePath, 'utf8', (err, data) => {
  const matches = data.match(regular);

  const normalizeName = matches.map((match) => match.replace(/{{|}}/g, ''));

  const promises = normalizeName.map((componentName) => {
    const componentPath = path.join(componentDirPath, componentName + '.html');
    return fs.promises.readFile(componentPath, 'utf8');
  });

  Promise.all(promises).then((componentContents) => {
    const result = matches.reduce((acc, match, index) => {
      return acc.replace(match, componentContents[index]);
    }, data);

    fs.writeFile(indexPath, result, () => {});
  });
});
//// CSS
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
/////-asets

function globalCopy(src, dest) {
  fs.mkdir(dest, () => {
    fs.readdir(src, (err, files) => {
      files.forEach((file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        fs.stat(srcPath, (err, stats) => {
          if (stats.isDirectory()) {
            globalCopy(srcPath, destPath);
          } else {
            fs.copyFile(srcPath, destPath, (err) => {});
          }
        });
      });
    });
  });
}

const newAssets = path.join(newDirPath, 'assets');
const assets = path.join(__dirname, 'assets');

fs.rm(newAssets, { recursive: true }, () => {
  globalCopy(assets, newAssets);
});
