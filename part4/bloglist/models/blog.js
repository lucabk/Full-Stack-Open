//import library
const mongoose = require('mongoose')

//schema definition and (custom) validation
const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
    minlength:3,
    unique:true
  },
  author: String,
  url: {
    type:String,
    required:true
  },
  likes: {
    type:Number,
    default:0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'//The new entry blog contains information about the user who created it
  }
})
//transform the document before it is returned as JSON
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