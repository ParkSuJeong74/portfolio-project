const { text } = require('express')
const { Schema, model } = require('mongoose')

// Schema project
const CommentSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        writer: {
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
        responseTo: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        hidden: {
            type: Boolean,
            required: true,
            default: false,
        },
        created_at: {
            type: Date,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true,
        }
    }
)

// model linking
const CommentModel = model("Comment", CommentSchema)

module.exports = { CommentModel }