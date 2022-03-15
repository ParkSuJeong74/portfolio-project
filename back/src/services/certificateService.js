const certificateClass = require("../db")
const { v4: uuidv4 } = require("uuid")

class CertificateService {
    async addCertificate({ user_id, title, description, when_date }) {
        const id = uuidv4()

        const newCertificate = { id, user_id, title, description, when_date }
        const createdNewCertificate = await Certificate.create({ newCertificate })

        return createdNewCertificate
    }

    async getCertificate({ certificateId }) {
        const certificate = await certificateClass.findById({ certificateId })
        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return certificate
    }

    async setCertificate({ certificateId, toUpdate }) {
        let certificate = await certificateClass.findById({ certificateId })

        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            certificate = await certificateClass.update({ certificateId, fieldToUpdate, newValue })
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            certificate = await certificateClass.update({ certificateId, fieldToUpdate, newValue })
        }

        if (toUpdate.when_date) {
            const fieldToUpdate = "when_date"
            const newValue = toUpdate.when_date
            certificate = await certificateClass.update({ certificateId, fieldToUpdate, newValue })
        }

        return certificate
    }

    async deleteCertificate({ certificateId }) {
        const isDataDeleted = await certificateClass.deleteById({ awardId })

        if (!isDataDeleted) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    }
    // TODO : user_id의 자격증 목록 가져오는(찾는) 기능
    async getCertificateList({ user_id }) {
        const certificates = await certificateClass.findByUserId({ user_id })
        return certificates
    }
}

const certificateService = new CertificateService()

module.exports = certificateService