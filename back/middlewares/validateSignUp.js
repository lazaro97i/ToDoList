import { User } from "../models/user_model.js"
import defaultResponse from "../config/response.js"

const accountExistsSignUp = async (req, res, next) => {

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

const accountExistsUpdate = async (req, res, next) => {

  const { data } = req.body

  const userExists = await User.findOne({ username: data.data.username })
  const emailExist = await User.findOne({ email: data.data.email })

  console.log(emailExist);
  // console.log(id);

  if (userExists && !userExists._id.equals(data.id)) {
    req.body.success = false
    req.body.sc = 400
    req.body.message = 'Nombre de usuario ya registrado'
    req.body.data = null
    return defaultResponse(req, res)
  }
  if (emailExist && !emailExist._id.equals(data.id)) {
    req.body.success = false
    req.body.sc = 400
    req.body.message = 'Email ya registrado'
    req.body.data = null
    return defaultResponse(req, res)
  }
  return next()

}

const validates = {
  accountExistsSignUp,
  accountExistsUpdate
}

export default validates