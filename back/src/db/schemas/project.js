const { schemas, model } = require('mongoose')

// Schema project
// id, user_id, title, description, timestamp
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
    },
    {
        timestamps: true,
    }
)

// model linking
const ProjectModel = model("Project", ProjectSchema)

module.exports = { ProjectModel }