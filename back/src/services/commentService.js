const { Comment } = require('../db')
const { v4: uuidv4 } = require('uuid')

const CommentService = {
    addComment : async ({ writer, articleId, comment, hidden, responseTo, created_at, updated_at }) => {
        const id = uuidv4()
        const newComment = { id, writer, articleId, comment, hidden, responseTo, created_at, updated_at }
        const createNewComment = await Comment.create({ newComment })
        return createNewComment
    },
    setComment : async ({ commentId, toUpdate }) => {
        let comment = await Comment.findById({ commentId })

        if(!commentId) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)

        comment = await Comment.update({ commentId, fieldToUpdate, newValue })
        return comment
    },
    deleteComment : async ({ commetId, toUpdate }) => {
        let comment = await Comment.findById({ commentId })

        if(!commentId) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)

        comment = await Comment.delete({ commentId, fieldToUpdate, newValue })
        return comment
    }
}

module.exports = { CommentService }
