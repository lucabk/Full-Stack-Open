const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

/*The test imports the Express application from the app.js module and wraps it with the supertest function into a
so-called superagent object. This object is assigned to the api variable and tests can use it for making HTTP
requests to the backend.*/
const api = supertest(app)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

  BLOG TESTS

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Blog Tests:', () => {

  let testId //global variable to store the user id

  //Let's initialize the database before every test with the beforeEach function:
  beforeEach(async () => {
    await Blog.deleteMany({}) //clear db
    await User.deleteMany({})//clear db

    const passwordHash = await bcrypt.hash('testpsw', 10)//hash the password
    const user = new User({ username: 'testuser', passwordHash })//create a new user
    const savedUser = await user.save()//save the user
    testId = savedUser._id.toString()

    //array of Mongoose objectsc reated with the Blog constructor
    const blogObjects = helper.initialBlog.map(blog => new Blog({
      ...blog,
      user: testId //Include the user "test" ID in each blog
    }))
    //array of promises for saving each of the items to the database
    const promiseArray = blogObjects.map(bb => bb.save())
    /*The Promise.all method can be used for transforming an array of promises into a single promise,
    that will be fulfilled once every promise in the array passed to it as an argument is resolved*/
    await Promise.all(promiseArray)//Promise.all executes the promises it receives in parallel (casual order)
  })



  //GET TESTS
  describe('GET test:', () => {

    /*Our test makes an HTTP GET request to the api/notes url and verifies that the request is responded to with
    the status code 200. The test also verifies that the Content-Type header is set to application/json*/
    test('blogs are returned as json and are two', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)//check if the header contains the string in question

      assert.strictEqual(response.body.length, helper.initialBlog.length)//response.body is a list of obj
    })

    //check id (not _id)
    test('the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      assert(Array.isArray(response.body))
      assert(response.body.length>0)
      assert('id' in response.body[0])
    })

    //tests for fetching an individual blog
    test('a specific blog can be viewed', async () => {
      const initialBlog = await helper.blogsInDb()//db query
      const blogToView = initialBlog[0]
      blogToView.user = blogToView.user.toString()//convert the Mongoose object to a string (from new ObjectId('66f92e19379c69da8256f131'))

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(response.body, blogToView)
    })

    //invalid id
    test('fails with statuscode 400 id is invalid', async () => {
      await api
        .get('/api/blogs/5a3d5da59070081a82a3445')
        .expect(400)
    })

    //blog not in the db
    test('fails with statuscode 404 if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()
      await api
        .get(`/api/blogs/${nonExistingId}`)
        .expect(404)
    })
  })



  //POST TESTS
  describe('addition of a new blog', () => {

    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Videogames',
        author: 'Ross Ulbricht',
        url: 'www.silkgames.onion',
        likes: 397204,
        user: testId
      }
      //post to routes.js
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      //query db
      const response = await helper.blogsInDb()
      assert.strictEqual(response.length, helper.initialBlog.length+1)//verify new length of collection
      const titles = response.map(b => b.title)
      assert(titles.includes('Videogames'))//verify new blog added
    })

    //test that verifies that a blog without title and url will not be saved into the database
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        author: 'Satoshi Nakamoto',
        likes: 39
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)//errorHandler 400 'validationErrror'

      const response = await helper.blogsInDb()
      assert.strictEqual(response.length, helper.initialBlog.length)
    })

    //test that verifies that if the likes property is missing from the request, it will default to the value 0
    test('without "likes" will set to zero like', async () => {
      const blogNoLikes = {
        title: 'RBMK',
        author: 'Valery Legasov',
        url: 'www.Pryp"jat.ua',
        user: testId
      }
      await api
        .post('/api/blogs')
        .send(blogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const response = await helper.blogsInDb()
      const blogJustAdded = response.find(b => b.title === blogNoLikes.title)//assumption: title must be unique
      assert.strictEqual(blogJustAdded.likes, 0)
    })

    test('fails if the user adding the blog is not specified', async () => {
      const blogBefore = await helper.blogsInDb()
      const newInvalidBlog = {
        title:'invalidTitle',
        author:'Unknown',
        url:'ww.invalidurl.com',
        likes: 0
      }
      const response = await api
        .post('/api/blogs')
        .send(newInvalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const blogAfter = await helper.blogsInDb()
      assert.deepStrictEqual(blogAfter, blogBefore)
      assert(response.body.error.includes('must specify user subject to add a blog'))
    })

    test('fails if the user is not in the users collection', async () => {
      const blogBefore = await helper.blogsInDb()
      const expiredUserId = helper.nonExistingUser()

      const newInvalidBlog = {
        title:'invalidTitle',
        author:'Unknown',
        url:'ww.invalidurl.com',
        likes: 0,
        user: expiredUserId
      }
      await api
        .post('/api/blogs')
        .send(newInvalidBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const blogAfter = await helper.blogsInDb()
      assert.deepStrictEqual(blogAfter, blogBefore)
    })
  })



  //DELETE test
  describe('deletion of a blog', () => {

    //tests for removing an individual note
    test('succeeds with status code 204 if id is valid', async () => {
      const initialBlog = await helper.blogsInDb()
      const blogToDelete = initialBlog[0]

      await api
        .del(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const finalBlog = await helper.blogsInDb()
      const titles = finalBlog.map( b => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(finalBlog.length, initialBlog.length-1)
    })

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/blogs/5a3d5da59070081a82a3445')
        .expect(400)
    })

  })


  //PUT test
  describe('Updating blog', () => {
    test('changing the likes only with a valid id and value', async () => {
      const initialBlog = await helper.blogsInDb()
      const blogToUpdated = initialBlog[1]
      const likesUpdated = 10
      blogToUpdated.likes = likesUpdated

      const serverResponse = await api
        .put(`/api/blogs/${blogToUpdated.id}`)
        .send(blogToUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      //check server response
      assert.strictEqual(serverResponse.body.likes, likesUpdated)

      //query db
      const dbEntries = await helper.blogsInDb()
      const blogUpdatedInDB = dbEntries.find(b => b.id === blogToUpdated.id)
      assert.deepStrictEqual(blogUpdatedInDB, blogToUpdated)//obj are equal
      assert.strictEqual(dbEntries.length, initialBlog.length)//same length as before
    })

    //invalid id
    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .put(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    //valid but not found id
    test('fails with statuscode 404 if blog does not exist', async () => {
      const nonExistingId = await helper.nonExistingId()
      await api
        .put(`/api/blogs/${nonExistingId}`)
        .expect(404)
    })
  })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

  USER TESTS

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('when there is initially one user in db', () => {
  /*The beforeEach function is called before each test in the test suite is run. In this case,
  the beforeEach function is used to empty the database of users and to create a new user*/
  beforeEach(async () => {
    await User.deleteMany({})//clear db

    const passwordHash = await bcrypt.hash('sekret', 10)//hash the password
    const user = new User({ username: 'root', passwordHash })//create a new user
    await user.save()//save the user
  })

  //The test checks that the users are returned as JSON and that the number of users is correct
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    //The test checks that the number of users in the database has increased by one
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    //The test checks that the username of the user created is included in the list of users
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })


  //The test checks that the creation of a user fails if the username is already taken
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with 400 statuscode if the password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'test',
      password: '12'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)//The test checks that the number of users in the database has not changed
    assert(response.body.error.includes('pass\'s length must be at least 3 characters'))
  })

  test('creation fails with 400 statuscode if the username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 't',
      name: 'test',
      password: '12345'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)//The test checks that the number of users in the database has not changed
    assert(response.body.error.includes('shorter than the minimum allowed length (3).'))
  })
})


/*Once all the tests have finished running we have to close the database connection used by Mongoose.
This can be easily achieved with the after method*/
after(async () => {
  await mongoose.connection.close()
})
