const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname);
console.log(modelsDir, "ruta")
const models = fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => require(path.join(modelsDir, file)));

module.exports = {models};