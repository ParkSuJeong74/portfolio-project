const { ProjectModel } = require('../schemas/project')

// Todo: Project
class Project{
    // POST
    static async create({ newProject }){
        const createNewProject = await ProjectModel.create(newProject)
        return createNewProject
    }

    // GET
    static async findById({ projectId }){
        const project = await ProjectModel.findOne({ id: projectId })
        return project
    }

    // PUT
    static async update({ projectId, fieldToUpdate, newValue }){
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
}

// singleton
// const project = new Project()
module.exports = { Project }