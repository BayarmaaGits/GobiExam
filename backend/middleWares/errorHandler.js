const handleNotFoundError = (req, res, next) => {
  res.status(404)
  res.json({ message: `URL not found ${req.originalUrl}` })
}

export { handleNotFoundError }
