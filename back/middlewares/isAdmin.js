import { User } from "../models/user_model.js"
import defaultResponse from "../config/response.js"

const isAdmin = async (req, res, next) => {

  const { id } = req.user

  const user = await User.findById(id)

  if (user.role !== 'ADMIN_ROLE') {
    req.body.success = false
    req.body.sc = 400
    req.body.data = 'Usuario no autorizado'
    return defaultResponse(req, res)
  } else {
    next()
  }

}

export default isAdmin