import db from './../model/index.js'

const ROLES = db.ROLES
const User = db.user

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ where: {username: req.body.username}})
  if (user) {
    res.status(400).send({
      erorr: 'USER_NAME_EXISTS',
      message: 'Username is already in use'
    })
    return
  }
  const email = await User.findOne({ where: {email: req.body.email}})
  if (email) {
    res.status(400).send({
      erorr: 'EMAIL_EXISTS',
      message: 'Email is already in use'
    })
    return
  }
  next()
}

export const checkRolesExists = (req, res, next) => {
  if (!req.body?.roles) {
    res.status(400).send({
      erorr: 'ROLE_NOT_EXISTS',
      message: 'Roles does not exist'
    })
    return
  }
  if (!req.body.roles.every(r => ROLES.includes(r))) {
    res.status(400).send({
      erorr: 'ROLE_NOT_CORRECT',
      message: 'Some role(s) are/is not valid'
    })
    return
  }
  next()
}

export default {
  checkRolesExists,
  checkDuplicateUsernameOrEmail,
}
