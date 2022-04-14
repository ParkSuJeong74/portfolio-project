const { Router } = require("express")
const { emailUtil } = require("../common/emailUtil")
const { passwordService } = require("../services/passwordService")

const passwordRouter = Router()

// 사용자 확인 후 메일 전송 api
passwordRouter.post("/emailAuth", async (req, res, next) => {
  try {
    const { email } = req.body
    // 가입한 사용자인지 검증, 맞으면 이메일 보내기
    await passwordService.getUser({ email })
    const message = `<p>비밀번호 변경을 위한 인증번호입니다.</p>`

    const authCode = await emailUtil.sendEmail(email, message)

    res.status(200).send(`${authCode}`)
  } catch (error) {
    next(error)
  }
})
// 비밀번호 변경 api, 새로운 비밀번호&비밀번호 확인 입력받아서 같으면 User DB 변경
passwordRouter.put("/", async (req, res, next) => {
  try {
    const { email, newPassword, confirmPassword } = req.body
    let updatedUser = await passwordService.setUser({
      email,
      newPassword,
      confirmPassword,
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = { passwordRouter }
