import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import db from './src/model/index.js'
import authRoute from './src/route/auth.js'
import contentRoute from './src/route/content.js'

const app = express()
var corsOptions = {
  origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

const Role = db.role
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db')
  // initial()
})
// TODO: use sql seed for initial data
// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user'
//   })
 
//   Role.create({
//     id: 2,
//     name: 'moderator'
//   })
 
//   Role.create({
//     id: 3,
//     name: 'admin'
//   })
// }

app.get('/', (req, res) => {
  res.json({ message: 'Hi there!' })
})

contentRoute(app)
authRoute(app)


// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})