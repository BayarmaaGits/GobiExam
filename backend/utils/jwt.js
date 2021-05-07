import jwt from 'jsonwebtoken'

const generateJWT = (id) => {
  return jwt.sign({ id: id }, process.env.TOKEN_SECRET, {
    expiresIn: '10d',
  })
}

export { generateJWT }
