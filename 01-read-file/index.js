const fs = require('fs');
const path = require('path');

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
input.on('data', chunk => console.log(chunk));
input.on('error', error => console.log('Error', error.message));