const path = require('path')
const express = require('express')
const session = require('express-session')
const Store = require('connect-session-knex')(session)
const helmet = require('helmet')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router.js')

const server = express()

server.use(express.static(path.join(__dirname, '../client')))
// server.use(helmet()) // just turning on for fewer headers
server.use(session({
  name: 'monkey',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge
  }
}))
server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))
})

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
