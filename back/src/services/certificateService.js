const { Certificate } = require("../db")
const { v4: uuidv4 } = require("uuid")

// closure(비공개 멤버)가 필요 없으므로 객체 리터럴만 선언하여 싱글톤 디자인 구현
const CertificateService = {
    addCertificate: async function({ user_id, title, description, when_date, created_at, updated_at }) {
        const id = uuidv4()

        const newCertificate = { id, user_id, title, description, when_date, created_at, updated_at }
        const createdNewCertificate = await Certificate.create({ newCertificate })

        return createdNewCertificate
    },
    getCertificate: async function({ certificateId }) {
        const certificate = await Certificate.findById({ certificateId })
        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return certificate
    },
    setCertificate: async function({ certificateId, toUpdate }) {
        let certificate = await Certificate.findById({ certificateId })

        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }
        // toUpdate에는 title, description, when_date 항목이 존재하고 값은 null이거나 사용자가 입력한 값
        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)
        
        certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })

        return certificate
    },
    deleteCertificate: async function({ certificateId }) {
        const isDataDeleted = await Certificate.deleteById({ certificateId })

        if (!isDataDeleted) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    },
    getCertificateList: async function({ user_id }) {
        const certificates = await Certificate.findByUserId({ user_id })
        return certificates
    }
}

module.exports = { CertificateService }