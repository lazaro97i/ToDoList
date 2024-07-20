import express from 'express'
import controller from '../controllers/task_controller.js'

const router = express.Router()

const {read, readOne, create, deleteOne, updateOne} = controller

router.get('/', read)
router.get('/get_task', readOne)

router.post('/', create)

router.delete('/', deleteOne)

router.put('/', updateOne)

export default router