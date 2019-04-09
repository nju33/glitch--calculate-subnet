module.exports = {
  json() {
    return (req, res, next) => {
      next();
    }
  }
}