const cors = require("cors")
const express = require("express")
const session = require("express-session")
const { userAuthRouter } = require("./routers/userRouter")
const { passwordRouter } = require("./routers/passwordRouter")
const { awardRouter } = require("./routers/awardRouter")
const { projectRouter } = require("./routers/projectRouter")
const { educationRouter } = require("./routers/educationRouter")
const { certificateRouter } = require("./routers/certificateRouter")
const { categoryRouter } = require("./routers/categoryRouter")
const { articleRouter } = require("./routers/articleRouter")
const { commentRouter } = require("./routers/commentRouter")

const { errorMiddleware } = require("./middlewares/errorMiddleware")

const app = express()
// CORS 에러 방지
app.use(cors())
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    req.accepts('application/json')
    next()
})
// 기본 페이지
app.get("/", (req, res) => {
    res.send("안녕하세요, 레이서 프로젝트 API 입니다.")
})

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use('/user', userAuthRouter)
app.use('/password', passwordRouter)
app.use('/award', awardRouter)
app.use('/project', projectRouter)
app.use('/education', educationRouter)
app.use('/certificate', certificateRouter)
app.use('/category', categoryRouter)
app.use('/article', articleRouter)
app.use('/comment', commentRouter)

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware)

module.exports = { app }
