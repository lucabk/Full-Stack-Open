//The logger has two functions, info for printing normal log messages, and error for all error messages.
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {  //rest parameters
  console.error(...params)      //spread operator
}

module.exports = {
  info, error
}