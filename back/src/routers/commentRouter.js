const is = require('@sindresorhus/is')
const { Router } = require('express')
const { timeUtil } = require('../common/timeUtil')
const { login_required } = require('../middlewares/login_required')
const { CommentService } = require('../services/commentService')

const commentRouter = Router()

commentRouter.use(login_required)

// POST : 댓글 작성
commentRouter.post('/create', async (req, res, next) => {
    try {  
        const writer = req.currentUserId
        const articleId = req.body.articleId
        const comment = req.body.comment
        const hidden = req.body.hidden

        const created_at = timeUtil.getTime()
        const updated_at = timeUtil.getTime()

        const newComment = await CommentService.addComment ({
            writer,
            articleId,
            comment,
            hidden,
            created_at,
            updated_at
        })

        res.status(201).json(newComment)
    } catch(err) {
        next(err)
    }
})

// put: 댓글 수정
commentRouter.put('/:id', async (req, res, next) => {
    try {
        // 로그인한 사용자 == 글 작성자
        const userId = req.currentUserId
        const writer = req.body.writer
        const commentId = req.params.id

        if(writer !== userId) {
            throw new Error("작성자가 아니라서 댓글을 수정할 수 없습니다!")
        }

        const comment = req.body.comment
        const hidden = req.body.hidden

        const updated_at = timeUtil.getTime()
        const toUpdate = { writer, comment, hidden, updated_at }

        const newComment = await CommentService.setComment({ commentId, toUpdate })

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
        // 로그인한 사용자 == 글 작성자
        const userId = req.currentUserId
        const writer = req.body.writer

        if(writer !== userId) {
            throw new Error("작성자가 아니라서 댓글을 삭제할 수 없습니다!")
        }
        
        const commentId = req.params.id
        const isDeleted = true
        const updated_at = timeUtil.getTime()

        const toUpdate = { isDeleted, updated_at }
        const newComment = await CommentService.deleteComment({ commentId, toUpdate })

        if(newComment.errorMessage){
            throw new Error(newComment.errorMessage)
        }

        res.status(200).send(newComment)
    } catch(err) {
        next(err)
    }
})

module.exports = { commentRouter }