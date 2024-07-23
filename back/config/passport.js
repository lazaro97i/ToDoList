import { User } from '../models/user_model.js'
import passport from 'passport'
import passportJwt from 'passport-jwt'

const { KEY_JWT } = process.env

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest:
        passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: KEY_JWT
    },
    async (jwt_payload, done) => {
      try {
        let user = await User.findOne({ _id: jwt_payload.id })
        if (user) {
          user = {
            id: user._id,
            username: user.username,
            photo: user.photo,
            role: user.role,
          }
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (e) {
        console.log(e)
        return done(e, false)
      }
    }
  )
)

export default passport