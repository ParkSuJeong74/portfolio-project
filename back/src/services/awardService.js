const { Award } = require("../db")
const { v4: uuidv4 } = require("uuid")

class AwardService {
    static async addAward({ user_id, title, description }) {
        const id = uuidv4()

        const newAward = { id, user_id, title, description }
        const createdNewAward = await Award.create({ newAward })

        return createdNewAward
    }

    static async getAward({ awardId }) {
        const award = await Award.findById({ awardId })
        if (!award) {
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return award
    }

    static async getAwardList({ user_id }) {
        const awards = await Award.findByUserId({ user_id })
        return awards
    }

    static async setAward({ awardId, toUpdate }) {
        let award = await Award.findById({ awardId })

        if (!award) {
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            award = await Award.update({ awardId, fieldToUpdate, newValue })
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            award = await Award.update({ awardId, fieldToUpdate, newValue })
        }
        
        return award
    }

    static async deleteAward({ awardId }) {
        const isDataDeleted = await Award.deleteById({ awardId })

        if (!isDataDeleted) {
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    }    
}

module.exports = { AwardService }