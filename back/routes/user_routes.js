import express from 'express'
import controller from '../controllers/user_controller.js'
import accountExists from '../middlewares/accountExists.js'
import validates from '../middlewares/validateSignUp.js'
import passport from '../config/passport.js'
import isAdmin from '../middlewares/isAdmin.js'

const {accountExistsSignUp, accountExistsUpdate} = validates

const {read, readOne, create, deleteOne, updateOne, signin, signinToken, signout} = controller

const router = express.Router()

router.get('/get_user/:userId',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  readOne
)
router.get('/',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  read
)

router.post('/signup/admin',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  accountExistsSignUp,
  create
  )

router.post('/signup',
  accountExistsSignUp,
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

router.delete('/:id',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  deleteOne
)

router.put('/',
  passport.authenticate('jwt', {session:false}),
  isAdmin,
  accountExistsUpdate,
  updateOne)

export default router