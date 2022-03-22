const { CommentModel } = require('../schemas/comment')

const Comment = {
    create : async ({ newComment }) => {
        const createNewComment = await CommentModel.create(newComment)
        return createNewComment
    },
    findById : async({ commentId }) => {
        const comment = await CommentModel.findOne({ id : commentId })
        return comment
    },
    update : async ({ commentId, updateObject }) => {
        const filter = { id: commentId }
        const update = {
            $set: updateObject
        }
        const option = { returnOriginal: false }
        const updateComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateComment
    },
    delete : async ({ commentId, updateObject }) => {
        const filter = { id: commentId }
        const update ={ $set: updateObject } 
        const option = { returnOriginal: false }

        const updateComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updateComment
    }
}

module.exports = { Comment }