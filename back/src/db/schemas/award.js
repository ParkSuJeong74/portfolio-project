const { Schema, model } = require('mongoose')

// Award Schema
const AwardSchema = new Schema(
    // award_id, user_id, title, description
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        }, 
        title: {
            type: String,
            required: true,
        },
        description: String,
        required: false,
    },
    {
        timestamps: true,
    }
)

// model과 연결
const AwardModel = model("Award", AwardSchema)

module.exports = { AwardModel }