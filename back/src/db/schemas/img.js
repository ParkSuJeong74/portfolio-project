const { Schema, model } = require("mongoose")

const ImgSchema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        originalName: {
            type: String,
            required: true
        },
        imgType: {
            type: String,
            required: true
        },
        detination: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        fileSize: {
            type: String,
            required: true
        }
    }
)

const ImgModel = model("Img", ImgSchema)

module.exports = { ImgModel }
