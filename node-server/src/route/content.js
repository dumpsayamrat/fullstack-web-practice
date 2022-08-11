import {
  verifyToken,
  isAdmin,
  isModerator,
} from './../middleware/authJwt.js'
import {
  allAccess,
  userContent,
  adminContent,
  moderatorContent,
} from './../controller/content.js'

export default (app) => {
  app.get('/api/content/all', allAccess)
  app.get('/api/content/user', [verifyToken], userContent)
  app.get('/api/content/mod', [verifyToken, isModerator], moderatorContent)
  app.get('/api/content/admin', [verifyToken, isAdmin], adminContent)
}