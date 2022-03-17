const { CertificateModel } = require("../schemas/certificate")

// closure(비공개 멤버)가 필요 없으므로 객체 리터럴만 선언하여 싱글톤 디자인 구현
const Certificate = {
    create: async function({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(newCertificate)
        return createdNewCertificate
    },
    findById: async function({ certificateId }) {
        const certificate = await CertificateModel.findOne({ id: certificateId })
        return certificate
    },
    update: async function({ certificateId, fieldToUpdate, newValue }) {
        const filter = { id: certificateId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        const updateCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateCertificate
    },
    deleteById: async function({ certificateId }) {
        const deleteResult = await CertificateModel.deleteOne({ id: certificateId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    },
    findByUserId: async function({ user_id }) {
        const certificates = await CertificateModel.find({ user_id })
        return certificates
    }
}

module.exports = { Certificate }