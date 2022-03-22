const { EducationModel } = require("../schemas/education")

const Education = {
    create: async ({ newEducation }) => {
        const education = await EducationModel.create(newEducation)
        return education
    },

    findById: async ({ educationId }) => {
        const education = await EducationModel.find({ id: educationId })
        return education
    },

    findByUserId: async ({ userId }) => {
        const education = await EducationModel.find({ userId })
        return education
    },

    update: async ({ educationId, updateObject }) => {
        const filter = { id: educationId }
        const update = { $set: updateObject }
        const option = { returnOriginal: false }

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedEducation
    },

    deleteById: async ({ educationId }) => {
        const deleteResult = await EducationModel.deleteOne({ id: educationId })
        const isDataDelete = deleteResult.deletedCount === 1

        return isDataDelete
    }
}

module.exports = { Education }
