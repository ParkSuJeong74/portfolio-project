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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        article_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Article'
        },
        comments: {
            type: text,
            required: false,
            maxlength: 500,
        },
        responseTo: {
            type: mongoose.Schema.Types.ObjectId,
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