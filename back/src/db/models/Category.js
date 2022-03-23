const { CategoryModel } = require('../schemas/category')
const { ArticleModel } = require("../schemas/article")

const Category = {
    create : async ({ newCategory }) => {
        const createNewCategory = await CategoryModel.create(newCategory)
        
        return createNewCategory
    },

    findAll : async ({}) => {
        const categorys = await CategoryModel.find({})
        return categorys
    },

    findByName : async ({ name }) => {
        const category = await CategoryModel.findOne({ name })
        return category
    },
    findAllByName : async ({ name }) => {
        const category = await CategoryModel.findOne({ name })
        const article = await ArticleModel.find({ categoryName: name })
        return { category, article }
    },
    update : async ({ name, updateObject }) => {
        const filter = { name : name }
        const update = { $set : updateObject }
        const option = { returnOriginal: false }
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            filter,
            update,
            option,
        )
        return updatedCategory
    }
}

module.exports = { Category }
