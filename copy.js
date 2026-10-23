const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'client', 'dist');
const dest = path.join(__dirname, 'dist');

if (fs.existsSync(src)) {
  fs.cpSync(src, dest, { recursive: true });
  console.log('✓ Successfully moved build files to root ./dist');
} else {
  console.error('Error: client/dist not found!');
  process.exit(1);
}