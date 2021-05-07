import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bdate: { type: Date, required: true },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
