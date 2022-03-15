const { Schema, model } = require('mongoose')

// Award Schema
const AwardSchema = new Schema(
    // award_id, user_id, title, description
    {
        id: {
            type: String,
            require: false,
        },
        user_id: {
            type: String,
            require: false,
        }, 
        title: {
            type: String,
            require: false,
        },
        description: String,
        require: false,
    },
    {
        timestamps: true,
    }
)

// model과 연결
const AwardModel = model("Award", AwardSchema)

module.exports = { AwardModel }