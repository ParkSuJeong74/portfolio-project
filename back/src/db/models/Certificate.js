const { CertificateModel } = require("../schemas/certificate")

// closure(비공개 멤버)가 필요 없으므로 객체 리터럴만 선언하여 싱글톤 디자인 구현
const Certificate = {
    create: async ({ newCertificate }) => {
        const createdNewCertificate = await CertificateModel.create(newCertificate)
        return createdNewCertificate
    },
    findById: async ({ certificateId }) => {
        const certificate = await CertificateModel.findOne({ id: certificateId })
        return certificate
    },
    update: async ({ certificateId, updateObject }) => {
        const filter = { id: certificateId } // 바꿀 대상 찾기
        const update = { $set: updateObject }
        const option = { returnOriginal: false } // 옵션 : upsert, overwrite 등

        const updateCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updateCertificate
    },
    deleteById: async ({ certificateId }) => {
        const deleteResult = await CertificateModel.deleteOne({ id: certificateId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    },
    findByUserId: async ({ userId }) => {
        const certificates = await CertificateModel.find({ userId })
        return certificates
    }
}

module.exports = { Certificate }
