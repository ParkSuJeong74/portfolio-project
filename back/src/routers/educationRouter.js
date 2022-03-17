const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const EducationService = require("../services/educationService")

const educationRouter = Router()
educationRouter.use(login_required)

educationRouter.post("/education/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content_Type을 application/json으로 설정해주세요."
            )
        }
        // request 데이터에서 값을 받아옴
        const user_id = req.body.user_id
        const school = req.body.school
        const major = req.body.major
        const position = req.body.position

        // reqest에서 받아온 값을 db에 추가
        const newEducation = await EducationService.addEducation({
            user_id,
            school,
            major,
            position
        })

        // 201: success to create resource, create이기 때문에 send 대신 json으로 응답
        res.status(201).json(newEducation)
    } catch (error) {
        next(error)
    }
})

// Todo : request에서 id를 받은 후 나머지 데이터를 받아와 응답으로 전송
educationRouter.get("/educations/:id", async (req, res, next) => {
    try {
        const educationId = req.params.id
        const education = await EducationService.getEducation({ educationId })

        if (education.errorMessage) {
            throw new Error(education.errorMessage)
        }

        res.status(200).send(education)
    } catch (error) {
        next(error)
    }
})

// Todo : request에서 id를 받은 후 id로 나머지 정보를 받아와 db데이터를 update
educationRouter.put("/educations/:id", async (req, res, next) => {
    try {
        const educationId = req.params.id

        const school = req.body.school
        const major = req.body.major
        const position = req.body.position

        const toUpdate = { school, major, position }

        const education = await EducationService.setEducation({
            educationId,
            toUpdate
        })

        if (education.errorMessage) {
            throw new Error(education.errorMessage)
        }

        res.status(200).send(education)
    } catch (error) {
        next(error)
    }
})

// Todo : request에서 id를 가져와 delete
educationRouter.delete("/educations/:id", async (req, res, next) => {
    try {
        const educationId = req.params.id

        const result = await EducationService.deleteEducation({ educationId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

// Todo : 사용자(user_id)의 전체 교육 데이터 조회
educationRouter.get("/educationlist/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id

        const educationList = await EducationService.getEducationList({ user_id })

        res.status(200).send(educationList)
    } catch (error) {
        next(error)
    }
})

module.exports = { educationRouter }