import User from '../models/userModel.js'
import { generateJWT } from '../utils/jwt.js'
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500)
    res.json({
      message: `Error occured getting all users from db : ${error.message}`,
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      res.json({
        message: `User not found : ${error.message}`,
      })
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: `Error occured getting a user from db : ${error.message}`,
    })
  }
}

const updateUserById = async (req, res) => {
  try {
    const { fname, lname, image, email } = req.body
    const user = await User.findById(req.params.id)
    if (user) {
      ;(user.fname = fname || user.fname),
        (user.lname = lname || user.lname),
        (user.image = image || user.image),
        (user.email = email || user.email),
        (user.password = user.password)

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        gender: updatedUser.gender,
        image: updatedUser.image,
        email: updatedUser.email,
        bdate: updatedUser.bdate,
        token: generateJWT(user._id),
      })
    } else {
      res.status(404)
      res.json({ message: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ message: `User update failed : ${error.message}` })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'User removed successfully!' })
    } else {
      res.status(404)
      res.json({
        message: `User not found : ${error.message}`,
      })
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: `User remove failed : ${error.message}`,
    })
  }
}
export { getUsers, getUserById, updateUserById, deleteUserById }
