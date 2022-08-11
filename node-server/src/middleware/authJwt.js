import jwt from 'jsonwebtoken'
// import role from '../model/role'
import config from './../config/auth.js'
import db from './../model/index.js'

const User = db.user

const getUserInfo = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  req.user = user
  req.roles = roles
  next()
}

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({
      error: 'NO_TOKEN_PROVIDED',
      message: 'No token provided'
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: 'UNAUTHORIZED',
        message: 'Unauthorized'
      })
    }
    req.userId = decoded.id
    getUserInfo(req, res, next)
  })
}

export const isAdmin = async (req, res, next) => {
  if (!req.roles.some(r => r.name === 'admin')) {
    return res.status(403).send({
      error: 'NOT_ADMIN',
      message: 'Require Admin Role'
    })
  }
  next()
}

export const isModerator = (req, res, next) => {
  if (!req.roles.some(r => r.name === 'moderator')) {
    return res.status(403).send({
      error: 'NOT_MODERATOR',
      message: 'Require Moderator Role'
    })
  }
  next()
}

export const isModeratorOrAdmin = (req, res, next) => {
  if (!req.roles.some(r => r.name === 'admin' || r.name === 'moderator')) {
    return res.status(403).send({
      error: 'NOT_ADMIN_OR_MODERATOR',
      message: 'Require Moderator or Admin Role'
    })
  }
  next()
}

export default {
  verifyToken,
  getUserInfo,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
}
