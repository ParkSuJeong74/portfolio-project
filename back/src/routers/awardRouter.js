const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { AwardService } = require('../services/awardService')

const awardRouter = Router()

// awardRouter.use(login_required)

// POST : 수상 경력 생성
awardRouter.post('/award/create', async (req, res, next) => {
    try {
        // body에 아무것도 없을 때 예외처리
        if(is.emptyObject(req.body)){
            throw new error("headers의 Content-Type을 application/json으로 설정해주세요.")
        }

        const user_id = req.body.user_id
        const title = req.body.title
        const description = req.body.description

        // db에 정보 저장, 저장할 데이터
        // Service -> newAward
        const newAward = AwardService.addAward({ user_id, title, description})
        
        // errorMessage 발생시 실행
        if(newAward.errorMessage) {
            throw new Error(newAward.errorMessage)
        }

        res.status(201).json(newAward)
    } catch(err) {
        next(err)
    }
})

// GET : awardID로 해당 수상경력 조회
awardRouter.get('/awards/:id', async (req, res, next) => {
    try {
        const awarId = req.params.id
        // db에서 데이터 찾기
        // Service -> award
        const award = await AwardService.getWard({ awardId })

        // errorMessage 발생시 실행
        if(award.errorMessage) {
            throw new Error(award.errorMessage)
        }

        res.status(200).send(award)
    } catch(err) {
        next(err)
    }
})

// PUT : awardID로 수상경력 수정
awardRouter.put('/awards/:id', async (req, res, next) => {
    try {
        const awardId = req.params.id

        const title = req.body.title ?? null
        const description = req.body.description ??  null
        
        const toUpdate = { title, description }

        // db에서 데이터 찾기
        const award = await AwardService.setAward({ awardId, toUpdate })

        // errorMessage 발생시 실행
        if(award.errorMessage) {
            throw new Error(award.errorMessage)
        }

        res.status(200).send(award)
    } catch (err) {
        next(err)
    }
})

// DELETE : awardId로 수상 경력 삭제
awardRouter.delete('/awards/:id', async (req, res, next) => {
    try {
        const awardId = req.params.id
        
        // db에서 삭제 = result
        const result = await AwardService.deleteAward({ awardId })

        // errorMessage 발생시 실행
        if(award.errorMessage) {
            throw new Error(award.errorMessage)
        }

        res.status(200).send(result)
    } catch(err){
        next(err)
    }
})

// GET : user_id로 수상 경력 조회
awardRouter.get('/awardlist/:user_id', async (req, res, next) => {
    try {
        const awardId = req.params.user_id

        // user_id로 db에서 찾기 = awardList
        const awardList = await AwardService.getAwardList({ user_id })

        // errorMessage 발생시 실행
        if(award.errorMessage) {
            throw new Error(award.errorMessage)
        }

        res.status(200).send(awardList)
    } catch(err){
        next(err)
    }
})

module.exports = { awardRouter }