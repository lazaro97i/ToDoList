import mongoose from "mongoose"

const schema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Titulo requerido'],
    maxLength: 100
  },
  description: {
    type: String,
    required: [true, 'Descripción requerida'],
    maxLength: 200
  },
  day: {
    type: String,
    required: [true, 'Dia de venimiento requerido']
  },
  month: {
    type: String,
    required: [true, 'Mes de venimiento requerido']
  },
  year: {
    type: String,
    required: [true, 'Año de venimiento requerido']
  },
  isActive: {
    type: Boolean, // true seria estado pendiente y false seria estado completo
    required: [true, 'Estado requerido']
  },
  user_id:{
    type: mongoose.ObjectId,
    required: true
  }

}, { timestamps: true })

export const Task = mongoose.model('task', schema)