import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import db from './../model/index.js'
import config from './../config/auth.js'

const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

export const signup = async (req, res) => {
  const {
    username,
    email,
    password,
    roles,
  } = req.body
  try {
    const [user, createdRoles] = await Promise.all([
      User.create({
        username,
        email,
        password: bcryptjs.hashSync(password, 8),
      }),
      roles.length ? Role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
      }) : Promise.resolve([1])
    ])
    await user.setRoles(createdRoles)
    res.send({ message: "User was registered successfully" })
  } catch (err) {
    res
      .status(500)
      .send({ error: 'REGISTER_ERROR', message: err.message })
  }
}

export const signin = async (req, res) => {
  const {
    username,
    password,
  } = req.body
  try {
    const user = await User.findOne({ where: {username}})
    if (!user) {
      return res.status(400).send({ error: 'NO_USERNAME', message: 'Username not found'})
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(403).send({ error: 'INVALID_PASSWORD', message: 'Password is invalid'})
    }
    const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 3600}) // 1 hour
    const roles = await user.getRoles()
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: roles.map(r => r.name),
      accessToken: token
    })
  } catch(err) {
    res
      .status(500)
      .send({ error: 'SIGNIN_ERROR', message: err.message })
  }
}
