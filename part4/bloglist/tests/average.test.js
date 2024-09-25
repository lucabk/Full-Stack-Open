const { test, describe } = require('node:test')
const assert = require('node:assert')
//imports the function to be tested and assigns it to a variable called listHelper
const listHelper = require('../utils/list_helper')

//Describe blocks can be used for grouping tests into logical collections
describe('dummy', () => {
  /*Individual test cases are defined with the test function.
  The first argument of the function is the test description as a string.
  The second argument is a function, that defines the functionality for the test case.*/
  test('returns one', () => {
    const blogs = []
    //First, we execute the code to be tested
    const result = listHelper.dummy(blogs)
    //Next, we verify the results with the the method strictEqual of the assert library
    assert.strictEqual(result, 1)
  })
})
