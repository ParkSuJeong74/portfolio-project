const { EducationModel } = require("../schemas/education")

class Education {
    async create({ newEducation }) {
        const createNewEducation = await EducationModel.create(newEducation)
        return createNewEducation
    }

    async findById({ educationId }) {
        const education = await EducationModel.find({ id: educationId })
        return education
    }

    async findByUserId({ user_id }) {
        const education = await EducationModel.find({ user_id })
        return education
    }

    async update({ educationId, fieldToUpdate, newValue }) {
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

    async deleteById({ educationId }) {
        const deleteResult = await EducationModel.deleteOne({ id: educationId })
        const isDataDelete = deleteResult.deletedCount === 1

        return isDataDelete
    }
}

const education = new Education()

module.exports = education