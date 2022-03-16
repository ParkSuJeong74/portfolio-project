const { ProjectModel } = require('../schemas/project')

// Project
class Project{
    // POST
     async create({ newProject }){
        const createNewProject = await ProjectModel.create(newProject)
        return createNewProject
    }

    // GET
     async findById({ projectId }){
        const project = await ProjectModel.findOne({ id: projectId })
        return project
    }

     async findByUserId({ user_id }){
        const project = await ProjectModel.find({ user_id })
        return project
    }

    // PUT
     async update({ projectId, fieldToUpdate, newValue }){
        const filter = { id: projectId }
        const update = { [fieldToUpdate]: newValue }
        const option = { returnOriginal: false }
        
        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option,
        )

        return updatedProject
    }

    // DELETE
     async deleteById({ projectId }){
        const deleteResult = await ProjectModel.deleteOne({ id: projectId })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

// singleton
const project = new Project()
module.exports = project