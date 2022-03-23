const { Award } = require("../db")
const { v4: uuidv4 } = require("uuid")
const { setUtil } = require('../common/setUtil')

const AwardService = {
    addAward: async ({ userId, title, description }) => {
        const id = uuidv4()

        const newAward = { id, userId, title, description }
        const createdNewAward = await Award.create({ newAward })

        return createdNewAward
    },

    getAward: async ({ awardId }) => {
        const award = await Award.findById({ awardId })
        if (!award) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        return award
    },

    getAwardList: async ({ userId }) => {
        const awards = await Award.findByUserId({ userId })
        return awards
    },

    setAward: async ({ awardId, toUpdate }) => {
        let award = await Award.findById({ awardId })

        if (!award) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        const updateObject = setUtil.compareValues(toUpdate, award)
        award = await Award.update({ awardId, updateObject })

        return award
    },

    deleteAward: async ({ awardId }) => {
        const isDataDeleted = await Award.deleteById({ awardId })

        if (!isDataDeleted) {
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        return { status: "ok" }
    }
}

module.exports = { AwardService }
