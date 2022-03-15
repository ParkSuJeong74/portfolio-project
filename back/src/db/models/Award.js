const { AwardModel } = require('../schemas/award')

// Todo : create, findById, findByUserId, update, deleteById
class Award {
    // POST
    static async create({ newAward }){
        const createNewAward = await AwardModel.create(newAward)
        return createNewAward
    } // newAward-> awardService

    // GET
    static async findById({ awardId }){
        const award = await AwardModel.findOne({ id: awaridId })
        return award
    } // award-> awardService

    // GET
    static async findByUserId({ user_id }){
        const awards = await AwardModel.findOne({ user_id })
        return awards
    } // awards-> awardService

    // PUT
    static async update({ awardId, fieldToUpdate, newValue }){
        const filter = { id: awardId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        // mongoose findOneAndUpdate : filter, update, option
        const updateAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option,
        )
        return updateAward
    } // updateAward -> awardService

    // DELETE
    static async deleteById({ user_id }){
        const deleteResult = await AwardModel.deleteOne({ id: awardId })
        const isDataDeleted = deleteResult.deletedCount === 1
        console.log("isDataDeleted : ", isDataDeleted)

        return isDataDeleted
    } // isDataDeleted -> awardService
}

module.exports = { Award }