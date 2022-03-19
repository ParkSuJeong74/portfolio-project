const { Schema, model } = require("mongoose")

const FollowSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        user_name: {
            type: String,
            ref: "User",
            required: true
        },

        follower: {
            type: Array,
            required: true
        },

        following: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const FollowModel = model("Follow", FollowSchema)

module.exports = { FollowModel }