const { Schema, model } = require("mongoose")

const ArticleSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      required: true,
    },
    likeUserIdList: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const ArticleModel = model("Article", ArticleSchema)

module.exports = { ArticleModel }
