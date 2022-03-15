const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { AwardService } = require("../services/awardService")

const awardRouter = Router()
awardRouter.use(login_required)

awardRouter.post("/award/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headersd,; Content-Type을 application/json으로 설정해주세요."
            )
        }

        const user_id = req.body.user_id
        const description = req.body.description

        const newAward = await AwardService.addAward({
            user_id,
            title,
            description,
        })

        res.status(201).json(newAward)
    } catch (error) {
        next(error)
    }
})

awardRouter.get("/awards/:id", async (req, res, next) => {
    try {
        const awardId = req.params.id
        const award = await AwardService.getAward({ awardId })

        if (award.errorMessage) {
            throw new Error(award.errorMessage)
        }

        res.status(200).send(award)
    } catch (error) {
        next(error)
    }
})

awardRouter.delete("/awards/:id", async (req, res, next) => {
    try {
        const awardId = req.params.id

        const result = await AwardService.deleteAward({ awardId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

awardRouter.get("/awardlist/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id
        const awardList = await AwardService.getAwardList({ user_id })
        res.status(200).send(awardList)
    } catch (error) {
        next(error)
    }
})

module.exports = { awardRouter }