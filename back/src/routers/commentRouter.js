const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { CommentService } = require('../services/commentService')
const { User } = require('../db/models/User')

const commentRouter = Router()

commentRouter.use(login_required)

// POST : 댓글 작성
commentRouter.post('/create', async (req, res, next) => {
    try {  
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const userId = req.currentUserId
        const writerId = userId // 작성자 = 현재 로그인한 사용자 
        const { articleId, comment, hidden } = req.body
        const newComment = await CommentService.addComment ({
            userId,
            writerId,
            articleId,
            comment,
            hidden
        })

        res.status(201).json(newComment)
    } catch(err) {
        next(err)
    }
})

// PUT : 댓글 수정
commentRouter.put('/:id', async (req, res, next) => {
    try {
        const userId = req.currentUserId
        const commentId = req.params.id
        const { comment, hidden } = req.body

        if(hidden == true) { // 익명 처리
            writerName = '익명'
        }
        else {
            const user = await User.findById({ userId })
            writerName = user.nickname // 닉네임으로 출력
        }

        const toUpdate = { comment, hidden, writerName }
        const newComment = await CommentService.setComment({ userId, commentId, toUpdate })

        if(newComment.errorMessage){
            throw new Error(newComment.errorMessage)
        }

        res.status(200).send(newComment)
    } catch(err) {
        next(err)
    }
})


// DELETE : 댓글 삭제(soft delete)
commentRouter.put('/:id/delete', async (req, res, next) => {
    try {
        const userId = req.body.userId
        const commentId = req.params.id
        const { comment } = req.body
        const isDeleted = true

        const toUpdate = { isDeleted, comment }
        const newComment = await CommentService.deleteComment({ userId, commentId, toUpdate })

        if(newComment.errorMessage){
            throw new Error(newComment.errorMessage)
        }

        res.status(200).send(newComment)
    } catch(err) {
        next(err)
    }
})

module.exports = { commentRouter }