const { Category } = require("../db")
const { v4: uuidv4 } = require("uuid")


const CategoryService = {
    addCategory : async ({ user_id, name, description, created_at, updated_at }) => {
        const id = uuidv4()
        
        // 이름 중복 검사 : DB에서 같은 이름 검색
        if(Category.findByName({ name })) {
            throw new Error("같은 이름이 존재합니다!!!")
        }

        const newCategory = { id, user_id, name, description, created_at, updated_at }
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
            throw new Error("해당 Name를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.")
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