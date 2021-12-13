function restrict(req, res, next) {
  // 1- it checked response for a COOKIE header
  // 2- pulled session id from it
  // 3- checked if live session by that id
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, message: 'not allowed!' })
  }
}

module.exports = {
  restrict,
}
