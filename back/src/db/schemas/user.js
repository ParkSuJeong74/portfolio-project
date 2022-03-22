const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    followingCount: {
      type: Number,
      required: true,
      default: 0
    },
    followerCount: {
      type: Number,
      required: true,
      default: 0
    },
    following: {
      type: Array,
      required: true,
    },
    follower: {
      type: Array,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

const UserModel = model("User", UserSchema)

module.exports = { UserModel }
