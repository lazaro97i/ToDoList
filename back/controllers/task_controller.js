import {Task} from '../models/task_model.js'
import defaultResponse from '../config/response.js'

const controller = {

  read: async (req, res) =>{

    try{
      const tasks = await Task.find({}, '-__v -createdAt -updatedAt')
      if(tasks){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Tareas encontradas :)'
        req.body.data = tasks
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Tareas no encontradas :)'
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  readOne: async(req,res) =>{

    const {taskId} = req.params

    try{
      const task = await Task.findById(taskId)
      const tasks = await Task.find({}, '-__v -createdAt -updatedAt')
      if(task){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Tarea encontrada :)'
        req.body.data = {task: task, tasks: tasks}
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Tarea no encontrada :)'
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  create: async(req,res) =>{

    const {title, description, day, month, year} = req.body
    const {user} = req

    try{
      const new_task = await Task.create({
        title:title,
        description:description,
        day: day,
        month: month,
        year: year,
        isActive: true,
        user_id: user.id
      })
      if(new_task){
        req.body.success = true
        req.body.sc = 201
        req.body.message = 'Tarea creada con éxito :)'
        req.body.data = new_task
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al crear tarea :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  deleteOne: async(req,res)=>{

    const {taskId} = req.params

    try{
      const task_deleted = await Task.findByIdAndDelete(taskId)
      if(task_deleted){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Tarea eliminada con éxito :)'
        req.body.data = task_deleted
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al eliminar tarea :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  updateOne: async(req, res) =>{

    const { taskId} = req.body
    const {data} = req.body

    try{
      const task_updated = await Task.findByIdAndUpdate(
        taskId, 
        data, 
        {new:true}
      )
      if(task_updated){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Tarea actualizada con éxito :)'
        req.body.data = task_updated
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al actualizar tarea :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  },

  setDone: async(req, res) =>{

    const {data} = req.body

    try{
      console.log(data)
      const task_updated = await Task.findByIdAndUpdate(
        data.id, 
        {isActive: data.status}, 
        {new:true}
      )
      if(task_updated){
        req.body.success = true
        req.body.sc = 200
        req.body.message = 'Tarea actualizada con éxito :)'
        req.body.data = task_updated
        return defaultResponse(req, res)
      }else{
        req.body.success = false
        req.body.sc = 400
        req.body.message = 'Error al actualizar tarea :('
        req.body.data = null
        return defaultResponse(req, res)
      }
    }catch(ex){
      console.log(ex)
    }
  }

}

export default controller