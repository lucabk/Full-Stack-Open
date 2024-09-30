const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

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


//a middleware that extracts a JSON Web Token (JWT) from the Authorization header of an HTTP request
const tokenExtractor = (req, res, next) => {
  //The function retrieves the value of the Authorization header from the request object using the get method
  const authorization = req.get('authorization')
  //The function checks if the authorization header exists and if it starts with the string 'Bearer '
  if (authorization && authorization.startsWith('Bearer ')) {
    //the function removes the 'Bearer ' prefix from the header value to extract the actual token
    req.token = authorization.replace('Bearer ', '')
  }
  //If the authorization header is not present or does not start with 'Bearer ', the function set  null
  else
    req.token = null

  next()
}


//middleware that finds out the user and sets it to the request object
const userExtractor = async (req, res, next) => {
  /*The function jwt.verify decodes the token
  The object decoded from the token contains the username and id fields, which tell the server who made the request.*/
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  //If the token is missing or it is invalid, the exception JsonWebTokenError is raised

  /*If the object decoded from the token does not contain the user's identity (decodedToken.id is undefined),
  error status code 401 unauthorized is returned*/
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  //The function retrieves the user ID from the decoded token and searches for the user in the database
  const user = await User.findById(decodedToken.id)

  req.user = user
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }