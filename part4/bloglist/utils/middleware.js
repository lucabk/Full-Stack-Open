const logger = require('./logger')

//This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//error handler middleware
const errorHandler = (error, req, res, next) => {
  logger.info('Error handler message:',error.message)
  /*The error handler checks if the error is a CastError exception, in which case we know that the error was caused
  by an invalid object id for Mongo. In this situation, the error handler will send a response to the browser with
  the response object passed as a parameter.
  In all other error situations, the middleware passes the error forward to the default Express error handler*/
  if (error.name === 'CastError') {
    logger.error('CastError detected')
    return res.status(400).json({ error: 'malformatted id' })
  }
  //mongoose validation error
  else if (error.name === 'ValidationError'){
    logger.error('CastError detected')
    return res.status(400).json({ error: error.message })
  }
  /*Mongoose validations do not detect the index violation (unique feature), and instead of ValidationError
  they return an error of type MongoServerError*/
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    logger.error('MongoServerError detected')
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }
  //JsonWebTokenError
  else if (error.name ===  'JsonWebTokenError') {
    logger.error('JsonWebTokenError detected')
    return res.status(401).json({ error: 'token invalid' })
  }
  //TokenExpiredError
  else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }

  next(error)// Pass errors to Express
}

module.exports = { unknownEndpoint, errorHandler }