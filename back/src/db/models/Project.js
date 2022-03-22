const { ProjectModel } = require('../schemas/project')

// Project
const Project = {
    // POST
    create: async ({ newProject }) => {
        const createNewProject = await ProjectModel.create(newProject)
        return createNewProject
    },

    // GET
    findById: async ({ projectId }) => {
        const project = await ProjectModel.findOne({ id: projectId })
        return project
    },

    findByUserId: async ({ userId }) => {
        const project = await ProjectModel.find({ userId })
        return project
    },

    // PUT
    update: async ({ projectId, updateObject }) => {
        const filter = { id: projectId }
        const update = { $set: updateObject }

        const option = { returnOriginal: false }

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updatedProject
    },

    // DELETE
    deleteById: async ({ projectId }) => {
        const deleteResult = await ProjectModel.deleteOne({ id: projectId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

// singleton
module.exports = { Project }
