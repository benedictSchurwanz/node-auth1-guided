function restrict(req, res, next) {
  // 150 lines of code
  console.log('restrict midd is kicking in!')
  next()
}

module.exports = {
  restrict,
}
