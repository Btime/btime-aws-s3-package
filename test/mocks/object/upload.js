const fs = require('fs')
const KEY = 'mochatest157'
const PNG_MIME_TYPE = 'image/png'
const XLSX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

module.exports = {
  imageWithContentType: {
    key: KEY,
    file: fs.readFileSync('./test/assets/lena.png'),
    contentType: PNG_MIME_TYPE,
    fileExtension: '.png'
  },

  documentWithContentType: {
    file: fs.readFileSync('./test/assets/xlsxtest.xlsx'),
    contentType: XLSX_MIME_TYPE,
    fileExtension: '.xlsx'
  }
}
