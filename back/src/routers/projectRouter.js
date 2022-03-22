const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { ProjectService } = require('../services/projectService')

const projectRouter = Router()

projectRouter.use(login_required)

// POST : 프로젝트 생성
projectRouter.post('/create', async (req, res, next) => {
    try{
        if(is.emptyObject(req.body)){
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요.")
        }
        
        const { userId, title, description, fromDate, toDate } = req.body
        const newProject = await ProjectService.addProject({
            userId,
            title,
            description,
            fromDate,
            toDate,
        })
        
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

// GET : 프로젝트 조회
projectRouter.get('/:id', async (req, res, next) => {
    try{
        const projectId = req.params.id
        const project = await ProjectService.getProject({ projectId })

        res.status(200).send(project)
    } catch(err) {
        next(err)
    }
})

// GET : 한 사용자의 프로젝트 목록 조회
projectRouter.get('/list/:userId', async (req, res, next) => {
    try{
        const userId = req.params.userId
        const projects = await ProjectService.getProjectList({ userId })

        res.status(200).send(projects)
    } catch(err) {
        next(err)
    }
})

// PUT : 프로젝트 수정
projectRouter.put('/:id', async (req, res, next) => {
    try{
        const projectId = req.params.id
        
        const { title, description, fromDate, toDate } = req.body
        const toUpdate = { title, description, fromDate, toDate }

        const project = await ProjectService.setProject({ projectId, toUpdate })

        res.status(200).send(project)
    } catch(err) {
        next(err)
    }
})

// DELETE : 프로젝트 삭제
projectRouter.delete('/:id', async (req, res, next) => {
    try{
        const projectId = req.params.id
        const result = await ProjectService.deleteProject({ projectId })

        res.status(200).send(result)
    } catch(err) {
        next(err)
    }
})

module.exports = { projectRouter }
