const { Project } = require('../db')
const { v4:uuidv4 } = require('uuid')

// ProjectService
class ProjectService{
    // POST
    static async addProject({ user_id, title, description }){
        const id = uuidv4()
        const newProject = { id, user_id, title, description }
        const createNewProject = await Project.create({ newProject })
        return createNewProject
    }
    // GET
    static async getProject({ projectId }){
        const project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return project
    }

    // PUT
    static async setProject({ projectId, toUpdate }){
        let project = await Project.findById({ projectId })

        if(!project){
            const errorMessage = "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        if(toUpdate.title){
            const fieldToUpdate = "title"
            const newValue = toUpdate.title
            project = await Project.update({ projectId, fieldToUpdate, newValue })
        }

        if(toUpdate.description){
            const fieldToUpdate = "description"
            const newValue = toUpdate.description
            project = await Project.update({ projectId, fieldToUpdate, newValue })
        }

        return project
    }
    // DELETE
}

// singleton
//const projectService = new ProjectService()

module.exports = { ProjectService }