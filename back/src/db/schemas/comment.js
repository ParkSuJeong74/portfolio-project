const { Schema, model } = require('mongoose')

const CommentSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        writerId: { // 작성자 Id
            type: String,
            required: true,
        },
        writerName: { // 표시되는 이름 : nickname, hidden일 때 '익명'
            type: String,
            required: true,
        },
        articleId: {
            type: String,
            required: true,
        },
        comment : {
            type: String,
            required: false,
            maxlength: 1000,
        },
        isDeleted: { // soft delete
            type: Boolean,
            default: false
        },
        hidden: { // 익명 처리
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const CommentModel = model("Comment", CommentSchema)

module.exports = { CommentModel }