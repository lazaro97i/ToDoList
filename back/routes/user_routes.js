import express from 'express'
import controller from '../controllers/user_controller.js'
import accountExists from '../middlewares/accountExists.js'
import validateSignUp from '../middlewares/validateSignUp.js'
import passport from '../config/passport.js'

const {read, readOne, create, deleteOne, updateOne, signin, signinToken, signout} = controller

const router = express.Router()

router.get('/', read)
router.get('/get_user', readOne)

router.post('/signup',
  validateSignUp,
   create
  )
router.post('/signin', accountExists, signin)
router.post('/signinToken',
  passport.authenticate('jwt', {session:false}), 
  signinToken
)
router.post('/signout',
  passport.authenticate('jwt', {session:false}),
  signout
)

router.delete('/', deleteOne)

router.put('/', updateOne)

export default router