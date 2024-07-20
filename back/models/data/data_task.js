import '../../config/database.js'
import { Task } from '../task_model.js'

const tasks = [
  {
    title: 'titulo task 1',
    description: 'descripción task 1',
    day: '20',
    month: '07',
    year: '2024',
    isActive: true,
    user_id: '669b5eb1308634c1288c0e24'
  },
  {
    title: 'titulo task 2',
    description: 'descripción task 2',
    day: '20',
    month: '07',
    year: '2024',
    isActive: true,
    user_id: '669b5eb1308634c1288c0e24'
  },
  {
    title: 'titulo task user 1',
    description: 'descripción task user 1',
    day: '20',
    month: '07',
    year: '2024',
    isActive: true,
    user_id: '669b5eb1308634c1288c0e25'
  },
  {
    title: 'titulo task user 2',
    description: 'descripción task user 2',
    day: '20',
    month: '07',
    year: '2024',
    isActive: true,
    user_id: '669b5eb1308634c1288c0e25'
  }
]

Task.insertMany(tasks)