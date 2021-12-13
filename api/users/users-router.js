const router = require("express").Router()
const { restrict } = require('../auth/auth-middleware')
const Users = require("./users-model.js")

// it could be wired to the whole router
// or the whole
router.get("/", restrict, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

module.exports = router
