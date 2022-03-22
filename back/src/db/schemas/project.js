const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        userId: {
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
        fromDate: {
            type: String,
            format : Date,
            required: true,
        },
        toDate: {
            type: String,
            format : Date,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const ProjectModel = model("Project", ProjectSchema)

module.exports = { ProjectModel }
