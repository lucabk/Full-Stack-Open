//import library
const mongoose = require('mongoose')
//set url  connection to cloud db
const config = require('../utils/config')
const url = config.MONGODB_URI
//logger
const logger = require('../utils/logger')
//allows you to query fields that are not defined in the schema
mongoose.set('strictQuery',false)


//connection to db
logger.info('connecting to', url,'...')
mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info('error connecting to MongoDB:', error.message)
  })

//schema definition and (custom) validation
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//model creation and export
//The public interface of the module is defined by setting a value to the module.exports variable
module.exports = mongoose.model('Blog', blogSchema)