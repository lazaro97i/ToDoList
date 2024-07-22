import express from 'express'
import controller from '../controllers/user_controller.js'
import accountExists from '../middlewares/accountExists.js'

const {read, readOne, create, deleteOne, updateOne, signin} = controller

const router = express.Router()

router.get('/', read)
router.get('/get_user', readOne)

router.post('/', create)
router.post('/signin', accountExists, signin)

router.delete('/', deleteOne)

router.put('/', updateOne)

export default router