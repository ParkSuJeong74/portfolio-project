const { Award } = require("../db")
const { v4: uuidv4 } = require("uuid")

const AwardService = {
    addAward : async ({ user_id, title, description}) => {
        const id = uuidv4()

      const id = uuidv4()

      const newAward = { id, user_id, title, description }
      const createdNewAward = await Award.create({ newAward })

        return createdNewAward
    },

    getAward : async ({ awardId }) => {
        const award = await Award.findById({ awardId })
        if (!award) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return award
    },

    getAwardList : async ({ user_id }) => {
        const awards = await Award.findByUserId({ user_id })
        return awards
    },

    setAward : async ({ awardId, toUpdate }) => {
        let award = await Award.findById({ awardId })

        if (!award) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
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
    },

    deleteAward : async ({ awardId }) => {
        const isDataDeleted = await Award.deleteById({ awardId })

        if (!isDataDeleted) {
            const errorMessage =
                "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return { status: "ok" }
    }
}

module.exports = { AwardService }