const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { CertificateService } = require("../services/certificateService")

const certificateRouter = Router()

certificateRouter.use(login_required)

certificateRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    const { userId, title, description, whenDate } = req.body
    const newCertificate = await CertificateService.addCertificate({
      userId,
      title,
      description,
      whenDate,
    })

    res.status(201).json(newCertificate)
  } catch (error) {
    next(error)
  }
})

certificateRouter.get("/lists/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const certificateList = await CertificateService.getCertificateList({
      userId,
    })

    res.status(200).send(certificateList)
  } catch (error) {
    next(error)
  }
})

certificateRouter.put("/:id", async (req, res, next) => {
  try {
    const certificateId = req.params.id
    const { title, description, whenDate } = req.body

    const toUpdate = { title, description, whenDate }
    const certificate = await CertificateService.setCertificate({
      certificateId,
      toUpdate,
    })

    res.status(200).send(certificate)
  } catch (error) {
    next(error)
  }
})

certificateRouter.delete("/:id", async (req, res, next) => {
  try {
    const certificateId = req.params.id
    const result = await CertificateService.deleteCertificate({ certificateId })

    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
})

module.exports = { certificateRouter }
