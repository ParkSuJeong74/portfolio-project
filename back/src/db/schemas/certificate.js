const { Schema, model } = require("mongoose")

const CertificateSchema = new Schema(
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
            required: true,
        },
        whenDate: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const CertificateModel = model("Certificate", CertificateSchema)

module.exports = { CertificateModel }
