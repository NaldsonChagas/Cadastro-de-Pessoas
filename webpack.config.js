const path = require('path')
module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  }
}