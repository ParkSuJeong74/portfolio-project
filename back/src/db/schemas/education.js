const { Schema, model } = require("mongoose")

const EducationSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
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

const EducationModel = model("Education", EducationSchema)

module.exports = { EducationModel }
