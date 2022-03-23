const { AwardModel } = require("../schemas/award")

const Award = {
    create: async ({ newAward }) => {
        const createdNewAward = await AwardModel.create(newAward)
        return createdNewAward
    },

    findById: async ({ awardId }) => {
        const award = await AwardModel.findOne({ id: awardId })
        return award
    },

    findByUserId: async ({ userId }) => {
        const awards = await AwardModel.find({ userId })
        return awards
    },

    update: async ({ awardId, updateObject }) => {
        const filter = { id: awardId }
        const update = { $set: updateObject }
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedAward
    },

    deleteById: async ({ awardId }) => {
        const deleteResult = await AwardModel.deleteOne({ id: awardId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

module.exports = { Award }
