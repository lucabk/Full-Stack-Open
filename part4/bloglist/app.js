const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/routes')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', router)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


