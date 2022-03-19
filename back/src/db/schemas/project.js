const { Schema, model } = require('mongoose')

// Schema project
const ProjectSchema = new Schema(
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
            required: false,
            default: "프로젝트를 설명해주세요."
        },
        from_date: {
            type: String,
            //format : Date,
            required: true,
        },
        to_date: {
            type: String,
            //format : Date,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

// model linking
const ProjectModel = model("Project", ProjectSchema)

module.exports = { ProjectModel }