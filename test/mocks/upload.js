const fs = require('fs')
const KEY = 'mochatest157'
const XLSX_MIME_TYPE = `
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  `.replace(/\n/g, '').trim()

module.exports = {
  payload: {
    key: KEY,
    file: fs.readFileSync('./test/assets/lena.png')
  },
  xlsx: {
    file: fs.readFileSync('./test/assets/xlsxtest.xlsx'),
    contentType: XLSX_MIME_TYPE,
    fileExtension: '.xlsx'
  }
}
