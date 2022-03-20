const { Schema, model } = require("mongoose")

const ArticleSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        category_name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        like: {
            type: Boolean,
            default: false,
            required: true,
        },
        like_count: {
            type: Number,
            default: 0,
            required: true,
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

const ArticleModel = model("Article", ArticleSchema)

module.exports = { ArticleModel }