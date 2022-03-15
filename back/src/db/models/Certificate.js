const { CertificateModel } = require("../schemas/certificate")

class Certificate {
    // TODO : 새로운 자격증 생성
    async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate)
        return createdNewCertificate
    }

    async findById({ certificateId }) {
        const certificate = await CertificateModel.findOne({ id: certificateId })
        return certificate
    }

    async update({ certificateId, fieldToUpdate, newValue }) {
        const filter = { id: certificateId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        const updateCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateCertificate
    }

    async deleteById({ certificateId }) {
        const deleteResult = await CertificateModel.deleteOne({ id: certificateId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }

    async findByUserId({ user_id }) {
        const certificates = await CertificateModel.find({ user_id })
        return certificates
    }
}

const certificateClass = new Certificate()

module.exports = certificateClass