import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
const checkAuth = async (req, res, next) => {
  console.log('Auth Middlware worked')
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decodedUserId = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = await User.findById(decodedUserId.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      res.json({ message: 'Not Valid Token' })
    }
  } else {
    res.status(401)
    res.json({ message: 'No Token!' })
  }
}

export { checkAuth }
