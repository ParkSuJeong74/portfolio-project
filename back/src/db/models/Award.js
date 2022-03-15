const { AwardModel } = require('../schemas/award')

// create, findById, findByUserId, update, deleteById
class Award {
    // POST
    static async create({ newAward }){
        console.log("여긴 들어옴??")
        const createNewAward = await AwardModel.create(newAward)
        return createNewAward
    }

    // GET
    static async findById({ awardId }){
        const award = await AwardModel.findOne({ id: awaridId })
        return award
    }

    // GET
    static async findByUserId({ user_id }){
        const awards = await AwardModel.findOne({ user_id })
        return awards
    }

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
    }

    // DELETE
    static async deleteById({ user_id }){
        const deleteResult = await AwardModel.deleteOne({ id: awardId })
        const isDataDeleted = deleteResult.deletedCount === 1 // 사라진 데이터 갯수가 1이면 true 반환

        return isDataDeleted
    } 
}

module.exports = { Award }