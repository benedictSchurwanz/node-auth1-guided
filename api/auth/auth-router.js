const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../users/users-model')
const bcryptjs = require('bcryptjs')

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
    const created = await User.add(newUser)
    res.status(201).json({ username: created.username, id: created.id })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    // 1- pull u and p from req.body
    const { username, password } = req.body
    // 2- pull the user using the username
    const [userFromDb] = await User.findBy({ username })
    if (!userFromDb) {
      return next({ message: 'invalid credentials', status: 401 })
    }
    const verifies = bcryptjs.compareSync(password, userFromDb.password)
    console.log(verifies)
    res.json('lady gaga')
    // 3- recreate the hash using password from req.body
    // 4- compare this agains the hash in the dabase
    // 5- start a session with the logged-in user
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
