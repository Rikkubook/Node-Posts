const ErrorMsg = require('./errorMsg');


const header = {
  'Content-Type': 'application/json' ,
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,DELETE'
}

const SuccessHandler = (res, data) => {
  res.writeHead(200, header)
  res.write(JSON.stringify({
    "status": "success",
    rooms: data
  }))
  res.end()
}

const ErrorHandler = (res, error= null, code=400) => {
  res.writeHead(400, header)
  res.write(JSON.stringify({
    "status": "false",
    "message": error? error.message: ErrorMsg[code],
    "error": error
  }))
  res.end()
}

module.exports = {SuccessHandler, ErrorHandler}