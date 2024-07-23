import { User } from "../models/user_model.js"
import defaultResponse from "../config/response.js"

const accountExists = async (req, res, next) => {

  const { username, email } = req.body

  const user = await User.findOne({ username: username })
  const emailExist = await User.findOne({ email: email })

  if (user) {
    req.body.success = false
    req.body.sc = 400
    req.body.message = 'Nombre de usuario ya registrado'
    req.body.data = null
    return defaultResponse(req, res)
  }
  if (emailExist) {
    req.body.success = false
    req.body.sc = 400
    req.body.message = 'Email ya registrado'
    req.body.data = null
    return defaultResponse(req, res)
  }
  return next()

}

export default accountExists