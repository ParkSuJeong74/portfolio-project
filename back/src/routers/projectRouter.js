const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { ProjectService } = require('../services/projectService')

const projectRouter = Router()

// login 한 사용자만 사용 가능
projectRouter.use(login_required)

// POST : 프로젝트 생성
projectRouter.post('/project/create', async (req, res, next) => {
    try{
        // body에 데이터 없는거 예외처리
        if(is.emptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요.")
        }
        
        // body에서 데이터 가져오기
        const user_id = req.body.user_id
        const title = req.body.title
        const description = req.body.description
        const from_date = req.body.from_date.split("T")[0]
        const to_date = req.body.to_date.split("T")[0]

        // db에서 데이터 저장
        const newProject = await ProjectService.addProject({
            user_id,
            title,
            description,
            from_date,
            to_date,
        })
        
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

// GET : 프로젝트 조회
projectRouter.get('/projects/:id', async (req, res, next) => {
    try{
        // id 가져오기
        const projectId = req.params.id

        // db에서 데이터 불러오기(service)
        const project = await ProjectService.getProject({ projectId })
        
        // error 발생
        if(project.errorMessage){
            throw new Error(project.errorMessage)
        }
        
        res.status(200).send(project)
    } catch(err) {
        next(err)
    }
})

// PUT : 프로젝트 수정
projectRouter.put('/projects/:id', async (req, res, next) => {
    try{
        // id 가져오기
        const projectId = req.params.id
        
        // body에서 정보 추출
        const title = req.body.title ?? null
        const description = req.body.description ?? null
        const from_date = req.body.from_date.split("T")[0] ?? null
        const to_date = req.body.to_date.split("T")[0] ?? null

        const toUpdate = { title, description, from_date, to_date }

        // db에서 데이터 수정하기(service)
        const project = await ProjectService.setProject({ projectId, toUpdate })

        // error 발생
        if(project.errorMessage){
            throw new Error(project.errorMessage)
        }
        res.status(200).send(project)
    } catch(err) {
        next(err)
    }
})

// DELETE : 프로젝트 삭제
projectRouter.delete('/projects/:id', async (req, res, next) => {
    try{
        // id 가져오기
        const projectId = req.params.id

        // db에서 데이터 삭제(service)
        const result = await ProjectService.deleteProject({ projectId })

        // error 발생
        if(result.errorMessage){
            throw new Error(result.errorMessage)
        }

        res.status(200).send(result)
    } catch(err) {
        next(err)
    }
})

// GET : 한 사용자의 프로젝트 목록 조회
projectRouter.get('/projectlist/:user_id', async (req, res, next) => {
    try{
        // id 가져오기
        const user_id = req.params.user_id
        // db에서 데이터 조회(service)
        const projects = await ProjectService.getProjectList({ user_id })
        res.status(200).send(projects)
    } catch(err) {
        next(err)
    }
})

module.exports = { projectRouter }