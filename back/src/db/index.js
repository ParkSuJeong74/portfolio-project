const mongoose = require("mongoose")

const { User } = require("./models/User")
const { Award } = require("./models/Award")
const { Project } = require("./models/Project")
const { Education } = require("./models/Education")
const { Certificate } = require("./models/Certificate")
const { Category } = require('./models/Category')
const { Comment } = require('./models/Comment')

const DB_URL =
  process.env.MONGODB_URL || "mongo_url"

mongoose.connect(DB_URL)
const db = mongoose.connection

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
)
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
)

module.exports = { User, Award, Project, Education, Certificate, Category, Comment }
