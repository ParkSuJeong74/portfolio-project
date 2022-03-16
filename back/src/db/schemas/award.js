const { Schema, model } = require("mongoose")

<<<<<<< HEAD
const AwardSchema = new Schema({
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
    description: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
=======
const AwardSchema = new Schema(
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
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
>>>>>>> ee4a50498ed5e9a95c083d5c7853bdfcb9609744
    }
)

const AwardModel = model("Award", AwardSchema)

module.exports = { AwardModel }