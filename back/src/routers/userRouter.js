const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { emailUtil } = require("../common/emailUtil")
const { userAuthService } = require("../services/userService")
const { s3Upload, s3Delete } = require("../middlewares/multerS3")

const userAuthRouter = Router()

// 이메일 입력 -> 인증코드 발송하고 front로 인증코드 send
userAuthRouter.post("/emailAuth", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const { email } = req.body
        // 이메일 중복검사
        await userAuthService.isExistUser({ email })
        const message = `<p>회원가입을 위한 인증번호입니다.</p>`
        const authCode = await emailUtil.sendEmail(email, message)

        res.status(200).send(`${authCode}`)
    } catch (error) {
        next(error)
    }
})

// 회원가입
userAuthRouter.post("/register", async (req, res, next) => {
    try {
        const { name, nickname, email, password } = req.body
        await userAuthService.isExistUser({ email })
        const newUser = await userAuthService.addUser({
            name,
            nickname,
            email,
            password,
        })

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
})

// 로그인
userAuthRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userAuthService.getUser({ email, password })

        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

// user list
userAuthRouter.get("/lists", login_required, async (req, res, next) => {
    try {
        const users = await userAuthService.getUsers()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
})

// login session
userAuthRouter.get("/current", login_required, async (req, res, next) => {
    try {
        // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
        const userId = req.currentUserId
        const currentUserInfo = await userAuthService.getUserInfo({
            userId,
        })

        res.status(200).send(currentUserInfo)
    } catch (error) {
        next(error)
    }
})

// put user info
userAuthRouter.put("/:id", login_required, async (req, res, next) => {
    try {
        const userId = req.params.id
        if (userId != req.currentUserId) {
            throw new Error("본인이 아니면 사용자 정보를 편집할 수 없습니다.")
        } else {
            const { nickname, description } = req.body
            const toUpdate = { nickname, description }

            const updatedUser = await userAuthService.setUser({
                userId,
                toUpdate,
            })

            res.status(200).json(updatedUser)
        }
    } catch (error) {
        next(error)
    }
})

// get user info
userAuthRouter.get("/:id", login_required, async (req, res, next) => {
    try {
        const userId = req.params.id
        const currentUserInfo = await userAuthService.getUserInfo({ userId })

        res.status(200).send(currentUserInfo)
    } catch (error) {
        next(error)
    }
})

userAuthRouter.delete("/:id", login_required, async (req, res, next) => {
    try {
        const userId = req.params.id
        const result = await userAuthService.deleteUser({ userId })

        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

userAuthRouter.put("/follow/:id", login_required, async (req, res, next) => {
    try {
        const userId = req.params.id
        const { targetUserId } = req.body

        const updatedUsers = await userAuthService.setUserFollow({
            targetUserId,
            userId,
        })

        res.status(200).json(updatedUsers)
    } catch (error) {
        next(error)
    }
})

userAuthRouter.post(
    "/:id/img",
    login_required,
    s3Upload(),
    async (req, res, next) => {
        try {
            const userId = req.params.id
            const userInfo = await userAuthService.getUserInfo({ userId })

            if (userInfo.imageName !== "none") {
                s3Delete(userInfo.imageName)
            }

            const { location } = req.file
            const imageName = location.split("amazonaws.com/")[1]
            const updatedUser = await userAuthService.setUserImage({
                userId,
                imageName,
            })

            res.status(200).json({ updatedUser })
        } catch (error) {
            next(error)
        }
    }
)

userAuthRouter.post(
    "/:id/img/delete",
    login_required,
    async (req, res, next) => {
        try {
            const userId = req.params.id
            const userInfo = await userAuthService.getUserInfo({ userId })

            if (userInfo.imageName !== "none") {
                s3Delete(userInfo.imageName)
            }

            const updatedUser = await userAuthService.setUserImage({
                userId,
                imageName: "none",
            })

            res.status(200).json({ updatedUser })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = { userAuthRouter }
