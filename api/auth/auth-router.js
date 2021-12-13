const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../users/users-model')

router.post('/register', async (req, res, next) => {
  try {
    // 1- pull u and p from req.body
    // 2- create a hash off of the password
    // 3- we will store u and hash to the db
    const { username, password } = req.body
    const newUser = {
      username,
      password: bcrypt.hashSync(password, 8), // 2^8 rounds
    }
    console.log(newUser)
    const created = await User.add(newUser)
    console.log(created)
    res.status(201).json(created)
  }  catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    res.json('login wired')
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  try {
    res.json('logout wired')
  } catch (err) {
    next(err)
  }
})

module.exports = router
