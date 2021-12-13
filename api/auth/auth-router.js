const express = require('express')

const router = express.Router()

router.get('/register', async (req, res, next) => {
  const { username, pas} = req.query
})

router.get('/login', async (req, res, next) => {

})

module.exports = router
