const { ProjectModel } = require('../schemas/project')

// Project
const Project = {
    // POST
    create : async ({ newProject }) => {
        const createNewProject = await ProjectModel.create(newProject)
        return createNewProject
    },

    // GET
    findById : async ({ projectId }) => {
        const project = await ProjectModel.findOne({ id: projectId })
        return project
    },

    findByUserId : async ({ user_id }) => {
        const project = await ProjectModel.find({ user_id })
        return project
    },

    // PUT
    update : async ({ projectId, fieldToUpdate, newValue }) => {
        const filter = { id: projectId }
        const update = { $set : { 
                [fieldToUpdate[0]]: newValue[0],
                [fieldToUpdate[1]]: newValue[1],
                [fieldToUpdate[2]]: newValue[2],
                [fieldToUpdate[3]]: newValue[3]
            }
        }
        
        const option = { returnOriginal: false }
        
        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option,
        )

        return updatedProject
    },

    // DELETE
    deleteById : async ({ projectId }) => {
        const deleteResult = await ProjectModel.deleteOne({ id: projectId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

// singleton
module.exports = { Project }