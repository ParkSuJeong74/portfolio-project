const { CommentModel } = require('../schemas/comment')

const Comment = {
    create : async ({ newComment }) => {
        const createNewComment = await CommentModel.create(newComment)
        return createNewComment
    },
    findById : async({ commentId }) => {
        const comment = await CommentModel.findOne({ id : commentId })
        console.log(comment)
        return comment
    },
    update : async ({ commentId, fieldToUpdate, newValue }) => {
        const filter = { id: commentId }
        const update = {
            $set: {
                [fieldToUpdate[0]] : newValue[0],
                [fieldToUpdate[1]] : newValue[1],
                [fieldToUpdate[2]] : newValue[2],
                [fieldToUpdate[3]] : newValue[3],
            }
        }
        const option = { returnOriginal: false }
        const updateComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateComment
    },
    delete : async ({ commentId, fieldToUpdate, newValue }) => {
        const filter = { id: commentId }
        const update = {
            $set: {
                [fieldToUpdate[0]] : newValue[0],
                [fieldToUpdate[1]] : newValue[1],
            }
        }
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