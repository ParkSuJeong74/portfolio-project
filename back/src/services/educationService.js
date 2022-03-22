const { Education } = require("../db/models/Education")
const { v4: uuidv4 } = require("uuid")
const { setUtil } = require('../common/setUtil')

const EducationService = {
    addEducation: async ({ userId, school, major, position }) => {
        // 인증에 사용하는 고유값을 만들어 id로 사용
        const id = uuidv4()

        const newEducation = { id, userId, school, major, position }
        const createdNewEducation = await Education.create({ newEducation })

        return createdNewEducation
    },

    getEducation: async ({ educationId }) => {
        const education = await Education.findById({ educationId })

        if (!education) {
            throw new Error("해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        return education
    },

    getEducationList: async ({ userId }) => {
        const education = await Education.findByUserId({ userId })
        return education
    },

    setEducation: async ({ educationId, toUpdate }) => {
        let education = await Education.findById({ educationId })

        if (!education) {
            throw new Error("해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        const updateObject = setUtil.compareValues(toUpdate, education)
        education = await Education.update({ educationId, updateObject })

        return education
    },

    deleteEducation: async ({ educationId }) => {
        const isDataDeleted = await Education.deleteById({ educationId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        // status: "ok" 를 return하면 router에서 받아서 응답으로 보냄
        return { status: "ok" }
    }
}

module.exports = { EducationService }
