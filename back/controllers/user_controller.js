import { User } from '../models/user_model.js'
import bcryptjs from 'bcryptjs'
import defaultResponse from '../config/response.js'
import jwt from 'jsonwebtoken'

const controller = {

  read: async (req, res) =>{

    try{
      const users = await User.find({}, '-__v -createdAt -updatedAt')
      if(users){
        req.body.success =true
        req.body.sc = 200
        req.body.message = 'Usuarios encontrados :)'
        req.body.data = users
        return defaultResponse(req, res)
      }else{
        req.body.success =false
        req.body.sc = 400
        req.body.message = 'Usuarios no encontrados :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  readOne: async (req, res) => {

    const {userId} = req.body

    try{
      const user = await User.findById(userId, '-__v -createdAt -updatedAt')
      if(user){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Usuario encontrado :)'
        req.body.data = user
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Usuario no encontrado :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  create: async (req, res) =>{

    const {username, email, password, role} = req.body
    
    if(!req.body.photo|| req.body.photo == ''){
      req.body.photo = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    }

    try{
      const new_user = await User.create({
        username: username,
        email: email,
        password: bcryptjs.hashSync(password, 10),
        role: role,
        photo: req.body.photo
      })

      if(new_user){
        req.body.success = true
        req.body.sc = 201
        req.body.message = 'Usuario creado con exito :)'
        req.body.data = new_user
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al crear usuario :('
        req.body.data = null
        return defaultResponse(req, res)
      }

    }catch(ex){
      console.log(ex)
    }

  },

  deleteOne: async (req, res) =>{

    const {userId} = req.body

    try{
      const user_deleted = await User.findByIdAndDelete(userId)
      if(user_deleted){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Usuario eliminado con exito :)'
        req.body.data = user_deleted
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al eliminar usuario :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }

  },

  updateOne: async (req, res) =>{

    const {userId} = req.body
    const {data} = req.body

    try{
      const user_updated = await User.findByIdAndUpdate(userId, data, {new:true})
      if(user_updated){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Usuario actualizado con exito :)'
        req.body.data = user_updated
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al actualizar usuario :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  signin: async (req, res) => {

    const { password } = req.body
    let { user } = req

    try {
      const verified = bcryptjs.compareSync(password, user.password)
      if (verified) {
        let token = jwt.sign(
          { id: user.id },
          process.env.KEY_JWT,
          { expiresIn: 60 * 60 * 3 }
        )
        user = {
          username: user.username,
          photo: user.photo,
          role: user.role
        }
        req.body.success = true
        req.body.message = 'Sesión iniciada'
        req.body.sc = 200
        req.body.data = { user, token }
        return defaultResponse(req, res)
      }
      req.body.success = false
      req.body.sc = 400
      req.body.message = "Contraseña incorrecta"
      req.body.data = null
      return defaultResponse(req, res)

    } catch (e) {
      console.log(e)
    }
  },

  signinToken: async (req, res) => {
    const { user } = req
    let { token } = req.body
    try {
      token = jwt.verify(token, process.env.KEY_JWT)
      req.body.success = true
      req.body.sc = 200
      req.body.data = {
        username: user.username,
        photo: user.photo,
        role: user.role,
      }
      defaultResponse(req, res)
    } catch (e) {
      console.log(e)
    }
  },

}

export default controller