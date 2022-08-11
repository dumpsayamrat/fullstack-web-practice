export default {
  HOST: "postgres",
  USER: "root",
  PASSWORD: "root",
  DB: "root",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
