const express   = require('express')
const mongoose  = require('mongoose')
const path      = require('path')

// env config
require('dotenv').config()

// server config
const server = express()
server.use(express.json())

// connect to mongodb
const db = process.env.DB
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Error connecting to MongoDB:\n${err}`))

// use routes
server.use('/api/users', require('./routes/api/users'))
server.use('/api/auth', require('./routes/api/auth'))
server.use('/api/posts', require('./routes/api/posts'))

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'))

    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// start server
const port = process.env.PORT || 8000
server.listen(port, () => console.log(`Server running on port ${port}...`))