const { AwardModel } = require("../schemas/award")

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward)
        return createdNewAward
    }

    static async findById({ awardId }) {
        const award = await AwardModel.find({ id: awardId })
        return award
    }

    static async findByUserId({ user_id }) {
        const awards = await AwardModel.find({ user_id })
        return awards
    }

    static async update({ awardId, fieldToUpdate, newValue }) {
        const filter = { id: awardId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option,
        )
        return updatedAward
    }

    static async deleteById({ awardId }) {
        const deleteResult = await AwardModel.deleteOne({ id: awardId })
        const isDataDeleted = deleteResult.deletedCount === 1

        return isDataDeleted
    }
}

module.exports = { Award }