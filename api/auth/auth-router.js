const express = require('express')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    // 1- pull u and p from req.body
    // 2- create a hash off of the password
    // 3- we will store u and hash to the db
    const { username, password } = req.body
    const newUser = {
      username,
    }
    res.json('register wired!')
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
