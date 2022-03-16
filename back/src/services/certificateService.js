const { Certificate } = require("../db")
const { v4: uuidv4 } = require("uuid")

class CertificateService {
    static async addCertificate({ user_id, title, description, when_date }) {
        const id = uuidv4()

        const newCertificate = { id, user_id, title, description, when_date }
        const createdNewCertificate = await Certificate.create({ newCertificate })

        return createdNewCertificate
    }

    static async getCertificate({ certificateId }) {
        const certificate = await Certificate.findById({ certificateId })
        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return certificate
    }

    static async setCertificate({ certificateId, toUpdate }) {
        let certificate = await Certificate.findById({ certificateId })

        if (!certificate) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
        }

        if (toUpdate.when_date) {
            const fieldToUpdate = "when_date"
            const newValue = toUpdate.when_date
            certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue })
        }

        return certificate
    }

    static async deleteCertificate({ certificateId }) {
        const isDataDeleted = await Certificate.deleteById({ certificateId })

        if (!isDataDeleted) {
            const errorMessage = "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    }

    static async getCertificateList({ user_id }) {
        const certificates = await Certificate.findByUserId({ user_id })
        return certificates
    }
}

module.exports = { CertificateService }