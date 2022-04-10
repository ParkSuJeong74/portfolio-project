const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { CategoryService } = require("../services/categoryService")

const categoryRouter = Router()

// POST
categoryRouter.post("/", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      )
    }
    const { name, description, userId } = req.body
    const newCategory = await CategoryService.addCategory({
      userId,
      name,
      description,
    })

    res.status(201).json(newCategory)
  } catch (err) {
    next(err)
  }
})

// GET
categoryRouter.get("/lists", async (req, res, next) => {
  try {
    const category = await CategoryService.getCategory()

    res.status(200).send(category)
  } catch (err) {
    next(err)
  }
})

// GET
categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const category = await CategoryService.getCategoryById({ categoryId })

    res.status(200).send(category)
  } catch (err) {
    next(err)
  }
})

// PUT
categoryRouter.put("/:id", login_required, async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const { description, name } = req.body
    const toUpdate = { description, name }
    const category = await CategoryService.setCategory({
      categoryId,
      toUpdate,
    })

    res.status(200).send(category)
  } catch (err) {
    next(err)
  }
})

module.exports = { categoryRouter }
