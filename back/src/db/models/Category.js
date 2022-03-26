const { CategoryModel } = require('../schemas/category')
const { ArticleModel } = require("../schemas/article")

const Category = {
    create : async ({ newCategory }) => {
        const createNewCategory = await CategoryModel.create(newCategory)
        
        return createNewCategory
    },

    findAll : async ({}) => {
        const categorys = await CategoryModel.find({}).sort({ name: 1 }) // 카테고리명 오름차순
        return categorys
    },

    findByName : async ({ name }) => {
        const category = await CategoryModel.findOne({ name })
        return category
    },

    findAllByName : async ({ name }) => {
        const category = await CategoryModel.findOne({ name })
        const article = await ArticleModel.find({ categoryName: name }).sort({ createdAt: -1 }) // 게시글 최신것부터
        return { category, article }
    },
    
    update : async ({ categoryName, updateObject }) => {
        const filter = { name : categoryName }
        const update = { $set : updateObject }
        const option = { returnOriginal: false }
        const updatedCategory = await CategoryModel.findOneAndUpdate(
            filter,
            update,
            option,
        )

        let result = updatedCategory

        if(updateObject.name){
            const filter = { categoryName : categoryName }
            const update = { categoryName: updateObject.name }
            const option = { returnOriginal: false }
            const updatedArticle = await ArticleModel.findOneAndUpdate(
                filter,
                update,
                option,
            )
            result = `{${result} , ${updatedArticle}}`
        }

        return result
    }
}

module.exports = { Category }
