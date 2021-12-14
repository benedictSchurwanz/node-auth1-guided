const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../users/users-model')

router.post('/register', async (req, res, next) => {
  try {
    // 1- pull username and password from req.body
    const { username, password } = req.body
    const newUser = {
      username,
      // 2- create a hash off of the password
      password: bcrypt.hashSync(password, 8), // 2^8 rounds
    }
    // 3- we will store username and hash to the db
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
    // 3- recreate the hash using password from req.body
    // 4- compare this agains the hash in the dabase
    const verifies = bcrypt.compareSync(password, userFromDb.password)
    if (!verifies) {
      return next({ message: 'invalid credentials', status: 401 })
    }
    // 5- start a session with the logged-in user
    // by writing something to the req.session
    //    1- a session gets created
    //    2- a SET-COOKIE header gets tacked to the response (with session ID)
    req.session.user = userFromDb
    res.json({
      message: `welcome back ${username}`
    })
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  try {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          res.json('you cannot leave, sorry!')
        } else {
          // manually set a cookie with an exp date in the past
          res.json('goodbye')
        }
      })
    } else {
      res.json('sorry but I do not know you!')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
