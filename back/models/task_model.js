import mongoose from "mongoose"

const schema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Titulo requerido'],
  },
  description: {
    type: String,
    required: [true, 'Descripción requerida']
  },
  day: {
    type: String,
    required: [true, 'Dia de inicio requerido']
  },
  month: {
    type: String,
    required: [true, 'Mes de inicio requerido']
  },
  year: {
    type: String,
    required: [true, 'Año de inicio requerido']
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