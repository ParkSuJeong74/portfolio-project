const { Category } = require("../db")
const { v4: uuidv4 } = require("uuid")
const { SetUtil } = require("../common/setUtil")

const CategoryService = {
  addCategory: async ({ userId, name, description }) => {
    const id = uuidv4()
    const category = await Category.findByName({ name })
    if (category) {
      throw new Error("같은 이름의 게시판이 이미 존재합니다.")
    }

    const newCategory = { id, userId, name, description }
    const createNewCategory = await Category.create({ newCategory })

    return createNewCategory
  },

  getCategory: async () => {
    const category = await Category.findAll({})
    return category
  },

  getCategoryById: async ({ categoryId }) => {
    const category = await Category.findById({ categoryId })

    if (!category) {
      throw new Error(
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
      )
    }
    return category
  },

  setCategory: async ({ categoryId, toUpdate }) => {
    let category = await Category.findById({ categoryId }) // 원래 카테고리 데이터
    if (!category) {
      throw new Error(
        "해당 Name를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요."
      )
    }
    console.log(category)
    let categoryTest = await Category.findByName({ name: toUpdate.name })
    if (categoryTest) {
      throw new Error("같은 이름의 게시판이 이미 존재합니다.")
    }

    const updateObject = SetUtil.compareValues(toUpdate, category)
    category = await Category.update({ categoryId, updateObject })

    return category
  },
}

module.exports = { CategoryService }
