import express from 'express'
const router = express.Router()
import {
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'
import {
  createNewUser,
  authenticateUser,
} from '../controllers/authenticationController.js'
import { checkAuth } from '../middleWares/auth.js'

router.post('/register', createNewUser)
router.post('/login', authenticateUser)
router.get('/', checkAuth, getUsers)
router.get('/:id', checkAuth, getUserById)
router.put('/:id', checkAuth, updateUserById)
router.delete('/:id', checkAuth, deleteUserById)

export default router
