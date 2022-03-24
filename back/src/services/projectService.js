const { Project } = require('../db')
const { v4: uuidv4 } = require('uuid')
const { TimeUtil } = require("../common/timeUtil")
const { SetUtil } = require('../common/setUtil')

const ProjectService = {
    // POST
    addProject : async ({ userId, title, description, fromDate, toDate }) => {
        const id = uuidv4()
        fromDate = TimeUtil.getDay(fromDate)
        toDate = TimeUtil.getDay(toDate)

        const newProject = { id, userId, title, description, fromDate, toDate }
        const createNewProject = await Project.create({ newProject })
        return createNewProject
    },

    // GET
    getProject : async ({ projectId }) => {
        const project = await Project.findById({ projectId })

        if(!project){
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }
        return project
    },

    getProjectList : async ({ userId }) => {
        const projects = await Project.findByUserId({ userId })
        return projects
    },

    // PUT
    setProject : async ({ projectId, toUpdate }) => {
        let project = await Project.findById({ projectId })

        if(!project){
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        const updateObject = SetUtil.compareValues(toUpdate, project)
        project = await Project.update({ projectId, updateObject })

        return project
    },
    // DELETE
    deleteProject : async ({ projectId }) => {
        const isDataDeleted = await Project.deleteById({ projectId })

        if(!isDataDeleted){
            throw new Error("해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
        }

        return { status : "ok" }
    }
}

// singleton
module.exports = { ProjectService }
