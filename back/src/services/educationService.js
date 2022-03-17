const Education = require("../db/models/Education")
const { v4: uuidv4 } = require("uuid")

class EducationService {
    async addEducation({ user_id, school, major, position }) {
        // 인증에 사용하는 고유값을 만들어 id로 사용
        const id = uuidv4()

        const newEducation = { id, user_id, school, major, position }
        const createdNewEducation = await Education.create({ newEducation })

        return createdNewEducation
    }

    async getEducation({ educationId }) {
        const education = await Education.findById({ educationId })

        if (!education) {
            const errorMessage =
                "해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return education
    }

    async getEducationList({ user_id }) {
        const education = await Education.findByUserId({ user_id })
        return education
    }

    async setEducation({ educationId, toUpdate }) {
        let education = await Education.findById({ educationId })

        if (!education) {
            const errorMessage =
                "해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        // toUpdate는 id를 제외한 나머지 데이터(school, major, position)
        // toUpdate에서 값을 확인하고 {id, 필드명, 바뀔 값}을 db에 저장
        if (toUpdate.school) {
            const fieldToUpdate = "school"
            const newValue = toUpdate.school
            education = await Education.update({ educationId, fieldToUpdate, newValue })
        }

        if (toUpdate.major) {
            const fieldToUpdate = "major"
            const newValue = toUpdate.major
            education = await Education.update({ educationId, fieldToUpdate, newValue })
        }

        if (toUpdate.position) {
            const fieldToUpdate = "position"
            const newValue = toUpdate.position
            education = await Education.update({ educationId, fieldToUpdate, newValue })
        }

        return education
    }

    async deleteEducation({ educationId }) {
        const isDataDeleted = await Education.deleteById({ educationId })

        if (!isDataDeleted) {
            const errorMessage =
                "해당 id를 가진 교육 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        // status: "ok" 를 return하면 router에서 받아서 응답으로 보냄
        return { status: "ok" }
    }
}

const educationService = new EducationService()

module.exports = educationService