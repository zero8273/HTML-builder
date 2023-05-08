const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.promises.writeFile(filePath, '').then(() => {
  console.log('Введите текст');
  line.on('line', async (input) => {
    if (input === 'exit') {
      console.log('До свидания!');
      rl.close();
    } else {
      await fs.promises.appendFile(filePath, input + '\n');
    }
  });
});

process.on('SIGINT', () => {
  console.log('Прощайте');
  process.exit();
});
