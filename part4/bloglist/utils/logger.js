/*The logger has two functions, info for printing normal log messages, and error for all error messages
The logger  does not print to the console in test mode*/
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {  //rest parameters
  if (process.env.NODE_ENV !== 'test'|| process.env.NODE_ENV === 'test') {
    console.error(...params)      //spread operator
  }
}

module.exports = {
  info, error
}