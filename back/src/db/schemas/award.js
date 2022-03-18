const { Schema, model } = require("mongoose")

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
    }
  )
  
  const AwardModel = model("Award", AwardSchema)

module.exports = { AwardModel }