const dotenv = require('dotenv').config()
const { app } = require("./src/app")

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.`)
})