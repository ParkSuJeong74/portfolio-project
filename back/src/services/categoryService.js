const { Category } = require("../db")
const { v4: uuidv4 } = require("uuid")


const CategoryService = {
    addCategory : async ({ user_id, name, description }) => {
        const id = uuidv4()

        const newCategory = { id, user_id, name, description }
        const createNewCategory = await Category.create({ newCategory })

        return createNewCategory
    },

    getCategory : async() => {
        const category = await Category.findAll({})
        return category
    },

    getCategoryByName : async({ categoryName }) => {
        const category = await Category.findByName({ categoryName })
        
        if(!categoryName){
            const errorMessage =
            "해당 Name를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return category
    },

    setCategory : async({ categoryName, toUpdate }) => {
        let category = await Category.findByName({ categoryName })

        if(!categoryName){
            const errorMessage = "해당 Name를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        const fieldToUpdate = Object.keys(toUpdate)
        const newValue = Object.values(toUpdate)

        category = await Category.update({ categoryName, fieldToUpdate, newValue })
        
        return category
    },

    deleteCategory : async({ categoryName }) => {
        const isDataDeleted = await Category.deleteByName({ categoryName })

        if(!isDataDeleted){
            const errorMessage = "해당 Name를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }

        return { status : 'ok' }
    }
}

module.exports = { CategoryService }