import User from '../models/userModel.js'
import { generateJWT } from '../utils/jwt.js'

const createNewUser = async (req, res) => {
  try {
    const { fname, lname, gender, email, password, bdate } = req.body

    const existedUser = await User.findOne({ email })
    if (existedUser) {
      res.status(401)
      res.json({ message: 'User already exists' })
    } else {
      const newUser = new User({
        fname,
        lname,
        gender,
        email,
        password,
        bdate,
      })

      const user = await newUser.save()

      if (user) {
        res.json({
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          gender: user.gender,
          image: user.image,
          email: user.email,
          bdate: user.bdate,
          token: generateJWT(user._id),
        })
      } else {
        console.log(user)
        res.status(400)
        res.json({ message: `User data is invalid : ` })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: `User registration failed : ${error.message}` })
  }
}

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && user.email === email && user.password === password) {
      res.json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        gender: user.gender,
        image: user.image,
        email: user.email,
        bdate: user.bdate,
        token: generateJWT(user._id),
      })
    } else {
      res.status(401)
      res.json({ message: `Your email or password is not correct!` })
    }
  } catch (error) {
    res.status(500)
    res.json({ message: 'User login failed' })
  }
}

export { createNewUser, authenticateUser }
