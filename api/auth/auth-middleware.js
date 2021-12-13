function restrict(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: 'not allowed!' })
  }
}

module.exports = {
  restrict,
}
