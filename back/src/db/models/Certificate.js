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
    update: async ({ certificateId, fieldToUpdate, newValue }) => {
        const filter = { id: certificateId } // 바꿀 대상 찾기
        const update = {
            $set: {
                // 바꿀 내용
                [fieldToUpdate[0]]: newValue[0],
                [fieldToUpdate[1]]: newValue[1],
                [fieldToUpdate[2]]: newValue[2],
                [fieldToUpdate[3]]: newValue[3]
            }
        }
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
    findByUserId: async ({ user_id }) => {
        const certificates = await CertificateModel.find({ user_id })
        return certificates
    }
}

module.exports = { Certificate }