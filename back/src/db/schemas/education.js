const { Schema, model } = require("mongoose")

const EducationSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        userId: {
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
        }
    },
    {
        timestamps: true
    }
)

const EducationModel = model("Education", EducationSchema)

module.exports = { EducationModel }
