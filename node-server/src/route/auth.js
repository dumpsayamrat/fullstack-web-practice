import {checkDuplicateUsernameOrEmail, checkRolesExists} from './../middleware/verifySighUp.js'
import {signup, signin} from './../controller/auth.js'

export default (app) => {
  app.post(
    '/api/auth/signup', [
      checkDuplicateUsernameOrEmail,
      checkRolesExists,
    ],
    signup
  )
  app.post(
    '/api/auth/signin',
    signin
  )
}