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
        },
        imageInfo: {
            fieldname: {
                type: String,
                required: true
            },
            originalname: {
                type: String,
                required: true
            },
            mimetype: {
                type: String,
                required: true
            },
            destination: {
                type: String,
                required: true
            },
            filename: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            }
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

const UserModel = model("User", UserSchema)

module.exports = { UserModel }
