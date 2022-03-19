const { Schema, model } = require("mongoose")

const CertificateSchema = new Schema(
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
        when_date: {
            type: String,
            required: true,
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

const CertificateModel = model("Certificate", CertificateSchema)

module.exports = { CertificateModel }