const { CategoryModel } = require('../schemas/category')

const Category = {
    create : async ({ newCategory }) => {
        const createNewCategory = await CategoryModel.create(newCategory)
        return createNewCategory
    },

    findAll : async ({}) => {
        const categorys = await CategoryModel.find({})
        return categorys
    },

    findByName : async ({ categoryName }) => {
        const category = await CategoryModel.findOne({ name : categoryName })
        return category
    },

    update : async ({ categoryName, fieldToUpdate, newValue }) => {
        const filter = { name : categoryName }
        const update = { $set : {
            [fieldToUpdate[0]]: newValue[0],
            [fieldToUpdate[1]]: newValue[1]
        }}
        const option = { returnOriginal: false }
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            filter,
            update,
            option,
        )
        return updatedCategory
    },

    deleteByName : async ({ categoryName }) => {
        const deleteResult = await CategoryModel.deleteOne({ name : categoryName })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

module.exports = { Category }