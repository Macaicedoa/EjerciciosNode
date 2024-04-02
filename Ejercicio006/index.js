import { writeFile } from 'node:fs';

writeFile('message.txt', 'Hello Node.js', 'utf8', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
}); 

