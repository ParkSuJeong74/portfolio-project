const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { AwardService } = require("../services/awardService")
const awardRouter = Router()

awardRouter.use(login_required)

awardRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      )
    }

    const { userId, title, description } = req.body
    const newAward = await AwardService.addAward({
      userId,
      title,
      description,
    })

    res.status(201).json(newAward)
  } catch (error) {
    next(error)
  }
})

awardRouter.get("/lists/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const awardList = await AwardService.getAwardList({ userId })
    res.status(200).send(awardList)
  } catch (error) {
    next(error)
  }
})

awardRouter.put("/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id

    const { title, description } = req.body
    const toUpdate = { title, description }
    const award = await AwardService.setAward({ awardId, toUpdate })

    res.status(200).send(award)
  } catch (error) {
    next(error)
  }
})

awardRouter.delete("/:id", async (req, res, next) => {
  try {
    const awardId = req.params.id
    const result = await AwardService.deleteAward({ awardId })

    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
})

module.exports = { awardRouter }
