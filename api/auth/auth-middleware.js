function restrict(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    
  }

}

module.exports = {
  restrict,
}
