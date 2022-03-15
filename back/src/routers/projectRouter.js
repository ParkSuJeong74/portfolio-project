const { Router } = require('express')

const projectRouter = Router()

// Todo : login 한 사용자만 사용 가능

// POST : 프로젝트 생성
projectRouter.post('project/create', (req, res, next) => {
    try{
        // Todo : body에 데이터 없는거 예외처리
        // Todo : body에서 데이터 가져오기
        // Todo : db에서 데이터 저장
        // Todo : error 발생
        res.send(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

// GET : 프로젝트 조회
projectRouter.get('projects/:id', (req, res, next) => {
    try{
        // Todo : id 가져오기
        // Todo : db에서 데이터 불러오기(service)
        // Todo : error 발생
        res.send(200).json(project)
    } catch(err) {
        next(err)
    }
})

// PATCH : 프로젝트 수정
projectRouter.patch('projects/:id', (req, res, next) => {
    try{
        // Todo : id 가져오기
        // Todo : db에서 데이터 찾기(service)
        // Todo : error 발생
        res.send(200).json(project)
    } catch(err) {
        next(err)
    }
})

// DELETE : 프로젝트 삭제
projectRouter.delete('projects/:id', (req, res, next) => {
    try{
        // Todo : id 가져오기
        // Todo : db에서 데이터 삭제(service)
        // Todo : error 발생
        res.send(200).json(result)
    } catch(err) {
        next(err)
    }
})

// GET : 한 사용자의 프로젝트 목록 조회
projectRouter.get('projectlist/:user_id', (req, res, next) => {
    try{
        // Todo : id 가져오기
        // Todo : db에서 데이터 조회(service)
        // Todo : error 발생
        res.send(200).json(projects)
    } catch(err) {
        next(err)
    }
})

module.exports = projectRouter