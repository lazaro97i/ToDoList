import express from 'express'
import controller from '../controllers/user_controller.js'

const {read, readOne, create, deleteOne, updateOne} = controller

const router = express.Router()

router.get('/', read)
router.get('/get_user', readOne)

router.post('/', create)

router.delete('/', deleteOne)

router.put('/', updateOne)

export default router