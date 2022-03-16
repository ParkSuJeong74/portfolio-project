const { EducationModel } = require("../schemas/education")

class Education {
    static async create({ newEducation }) {
        const createNewEducation = await EducationModel.create(newEducation)
        return createNewEducation
    }

    static async findById({ educationId }) {
        const education = await EducationModel.find({ id: educationId })
        return education
    }

    static async findByUserId({ user_id }) {
        const education = await EducationModel.find({ user_id })
        return education
    }

    static async update({ educationId, fieldToUpdate, newValue }) {
        const filter = { id: educationId }
        // String을 key값으로 쓸 땐 배열로 감싸줌
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedEducation
    }

    static async deleteById({ educationId }) {
        const deleteResult = await EducationModel.deleteOne({ id: educationId })
        const isDataDelete = deleteResult.deletedCount === 1

        return isDataDelete
    }
}

module.exports = { Education }