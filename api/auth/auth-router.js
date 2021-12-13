const express = require('express')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
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
