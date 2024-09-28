//we decide to store the ids of the blogs created by the user in the user document
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,   //this ensures the uniqueness of username: to work db must be in healty state (no duplicates)
    required: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,//The type of the blogs array is an array of ObjectIds
      ref: 'Blog'//This tells mongoose that the blogs array will consist of items that conform to the Blog schema
    }
  ],//The user document will contain an array of ObjectIds that refer to the blogs created by the user
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User