const { CategoryModel } = require("../schemas/category")
const { ArticleModel } = require("../schemas/article")

const Category = {
  create: async ({ newCategory }) => {
    const createNewCategory = await CategoryModel.create(newCategory)

    return createNewCategory
  },

  findAll: async ({}) => {
    const categorys = await CategoryModel.find({}).sort({ name: 1 }) // 카테고리명 오름차순
    return categorys
  },

  findByName: async ({ name }) => {
    const category = await CategoryModel.findOne({ name })
    return category
  },

  findById: async ({ categoryId }) => {
    const category = await CategoryModel.findOne({ id: categoryId })
    const article = await ArticleModel.find({ categoryId }).sort({
      createdAt: -1,
    }) // 게시글 최신것부터
    return { category, article }
  },

  update: async ({ categoryId, updateObject }) => {
    const filter = { id: categoryId }
    const update = { $set: updateObject }
    const option = { returnOriginal: false }
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updatedCategory
  },
}

module.exports = { Category }
