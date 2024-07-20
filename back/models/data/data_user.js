import '../../config/database.js'
import bcrypts from 'bcryptjs'
import { User } from "../user_model.js"

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    password: bcrypts.hashSync('admin1234', 10),
    photo: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    role: 'ADMIN_ROLE'
  },
  {
    username: 'user',
    email: 'user@user.com',
    password: bcrypts.hashSync('user1234', 10),
    photo: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    role: 'USER_ROLE'
  }
]

User.insertMany(users)