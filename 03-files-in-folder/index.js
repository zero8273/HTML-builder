const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'utf-8', (data) => {
  console.log(data);
});
