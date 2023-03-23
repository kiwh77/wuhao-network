const Fs = require('fs')
const Path = require('path')

function valuesOfPath(path) {
  let result = {}
  function existFile(existPath) {
    const names = Fs.readdirSync(existPath)
    names.map(name => {
      const namePath = Path.join(existPath, name)
      const stat = Fs.statSync(namePath)
      if (stat.isDirectory()) {
        existFile(existPath)
      } else if (stat.isFile() && name.indexOf('.js') > -1) {
        const values = require(namePath)
        result = Object.assign(result, values)
      }
    })
  }
  existFile(path)
  return result
}

module.exports = {
  valuesOfPath
}
