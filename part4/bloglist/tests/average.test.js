const { test, describe } = require('node:test')
const assert = require('node:assert')
//imports the function to be tested and assigns it to a variable called listHelper
const { totalLikes, dummy, favoriteBlog } = require('../utils/list_helper')

const listWithOneBlog  = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []
  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})


//Describe blocks can be used for grouping tests into logical collections
describe('Total Likes', () => {
  /*Individual test cases are defined with the test function.
  The first argument of the function is the test description as a string.
  The second argument is a function, that defines the functionality for the test case.*/
  //EMPTY LIST
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]),0)
  })
  //ONE BLOG
  test('when list has only one blog, equals the likes of that', () => {
    //First, we execute the code to be tested
    const result = totalLikes(listWithOneBlog)
    //Next, we verify the results with the the method strictEqual of the assert library
    assert.strictEqual(result, 5)
  })
  //MULTIPLE BLOGS
  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes(blogs), 36)
  })
})

//Most likes
describe('Most Likes', () => {

  // eslint-disable-next-line no-unused-vars
  const oneBlog = {
    title: listWithOneBlog[0].title,
    author: listWithOneBlog[0].author,
    likes: listWithOneBlog[0].likes
  }
  const blogWithMostLikes = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }


  test('of empty list is zero', () => {
    assert.strict(favoriteBlog([]),{})
  })
  test('of one blog, equals the likes of that', () => {
    assert.strict(favoriteBlog(listWithOneBlog),oneBlog)
  })
  test('of a bigger list is calculated right', () => {
    assert.strict(favoriteBlog(blogs), blogWithMostLikes)
  })
})