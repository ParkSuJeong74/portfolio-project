const { Certificate } = require("../db")
const { v4: uuidv4 } = require("uuid")
const { timeUtil } = require('../common/timeUtil')
const { setUtil } = require('../common/setUtil')

// closure(비공개 멤버)가 필요 없으므로 객체 리터럴만 선언하여 싱글톤 디자인 구현
const CertificateService = {
    addCertificate: async ({ userId, title, description, whenDate }) => {
        const id = uuidv4()
        whenDate = timeUtil.getDay(whenDate)
        const newCertificate = { id, userId, title, description, whenDate }
        const createdNewCertificate = await Certificate.create({ newCertificate })

        return createdNewCertificate
    },
    getCertificate: async function({ certificateId }) {
        const certificate = await Certificate.findById({ certificateId })
        if (!certificate) {
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return certificate
    },
    setCertificate: async ({ certificateId, toUpdate }) => {
        let certificate = await Certificate.findById({ certificateId })

        if (!certificate) {
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }
        // toUpdate에는 title, description, when_date 항목이 존재하고 값은 null이거나 사용자가 입력한 값
        const updateObject = setUtil.compareValues(toUpdate, certificate)
        certificate = await Certificate.update({ certificateId, updateObject })

        return certificate
    },
    deleteCertificate: async ({ certificateId }) => {
        const isDataDeleted = await Certificate.deleteById({ certificateId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해주세요.")
        }

        return { status: "ok" }
    },
    getCertificateList: async ({ userId }) => {
        const certificates = await Certificate.findByUserId({ userId })
        return certificates
    }
}

module.exports = { CertificateService }
