const { AwardModel } = require("../schemas/award")

const Award = {
    create : async ({ newAward }) => {
        const createdNewAward = await AwardModel.create(newAward)
        return createdNewAward
    },

    findById : async ({ awardId }) => {
        const award = await AwardModel.findOne({ id: awardId })
        return award
    },

    findByUserId : async ({ user_id }) => {
        const awards = await AwardModel.find({ user_id })
        return awards
    },

    update : async ({ awardId, fieldToUpdate, newValue }) => {
        const filter = { id: awardId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option,
        )
        return updatedAward
    },

    deleteById : async ({ awardId }) => {
        const deleteResult = await AwardModel.deleteOne({ id: awardId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

module.exports = { Award }