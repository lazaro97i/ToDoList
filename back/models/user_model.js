import mongoose from "mongoose"

const schema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, 'Nombre de usuario requerido'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Contraseña requerida'],
  },
  photo: {
    type: String
  },
  role:{
    type: String,
    required: [true, 'Rol requerido'],
    enum: ['ADMIN_ROLE','USER_ROLE']
  }

}, {timestamps:true})

export const User = mongoose.model('user', schema)