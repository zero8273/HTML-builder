const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

process.on('SIGINT', async () => {
  console.log('Прощай');
  await line.close();
  process.exit();
});

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
line.on('close', () => {
  console.log('Прощайте');
  process.exit();
});
fs.promises.writeFile(filePath, '').then(() => {
  console.log('Введите текст');
  line.on('line', async (input) => {
    if (input === 'exit') {
      line.close();
    } else {
      await fs.promises.appendFile(filePath, input + '\n');
    }
  });
});
