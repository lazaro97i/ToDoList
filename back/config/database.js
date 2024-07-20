import mongoose from "mongoose"
import 'dotenv/config.js'

mongoose.connect(process.env.DBHOST) // variable de entorno que contiene el conection string para la dd
  .then(() => console.log('Database conected'))
  .catch(err => console.log(err))