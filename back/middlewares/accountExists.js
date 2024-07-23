import { User } from "../models/user_model.js"
import defaultResponse from "../config/response.js"

const accountExists = async (req, res, next) => {

  const { username } = req.body
  const user = await User.findOne({ username: username })

  if (user) {
    req.user = {
      id: user._id,
      username: user.username,
      password: user.password,
      photo: user.photo,
      role: user.role
    }
    return next()
  }
  req.body.success = false
  req.body.sc = 400
  req.body.message = 'Nombre de usuario incorrecto'
  req.body.data = null
  return defaultResponse(req, res)

}

export default accountExists