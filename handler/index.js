const ErrorMsg = require('./errorMsg');
const header = require('../config');

const successHandler = (res, data) => {
  res.writeHead(200, header)
  res.write(JSON.stringify({
    "status": "success",
    "data": data
  }))
  res.end()
}

const errorHandler = (res, error= null, code=400) => {
  res.writeHead(400, header)
  res.write(JSON.stringify({
    "status": "false",
    "message": error? error.message: ErrorMsg[code],
    "error": error
  }))
  res.end()
}

module.exports = {successHandler, errorHandler}