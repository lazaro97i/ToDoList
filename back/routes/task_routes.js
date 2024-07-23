import express from 'express'
import controller from '../controllers/task_controller.js'
import passport from '../config/passport.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

const {read, readOne, create, deleteOne, updateOne, setDone} = controller

router.get('/',
  passport.authenticate('jwt', {session:false}), 
  read
)
router.get('/get_task/:taskId', 
  passport.authenticate('jwt', {session:false}),
  readOne
)

router.post('/',
  passport.authenticate('jwt', {session:false}),
  create
)

router.delete('/:taskId',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  deleteOne)

router.put('/', 
  passport.authenticate('jwt', {session:false}),
  updateOne
)
router.put('/setDone', 
  passport.authenticate('jwt', {session:false}), 
  setDone
)

export default router