import express from 'express'
import users from './user_routes.js'
import tasks from './task_routes.js'

const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/user', users)
router.use('/task', tasks)

export default router
