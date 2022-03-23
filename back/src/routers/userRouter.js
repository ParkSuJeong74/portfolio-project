const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")
const { s3Upload, s3Delete } = require("../middlewares/multerS3")

const userAuthRouter = Router()

// 회원가입
userAuthRouter.post("/register", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error("headers의 Content-Type을 application/json으로 설정해주세요")
        }

        const { name, nickname, email, password } = req.body
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
userAuthRouter.get("/list", login_required, async (req, res, next) => {
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
        const { nickname, description } = req.body
        const toUpdate = { nickname, description }

        const updatedUser = await userAuthService.setUser({ userId, toUpdate })

        res.status(200).json(updatedUser)
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

// My -> 내 id로 db에서 가져온 데이터, Your -> 상대 id로 db에서 가져온 데이터
// follower -> 나를 follow하는 .. / following -> 내가 follow하는 ..
// follow : count 증가, 내 following과 상대 follower에 서로의 id를 add
// unfollow : count 감소, 내 following과 상대 follower에 서로의 id를 remove
userAuthRouter.put("/follow/:id", login_required, async (req, res, next) => {
    try {
        const userIdMy = req.params.id
        const { userIdYour } = req.body

        const updatedUsers = await userAuthService.setUserFollow({
            userIdYour,
            userIdMy
        })

        res.status(200).json(updatedUsers)
    } catch (error) {
        next(error)
    }
})

userAuthRouter.put("/:id/img",
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
            const updatedUser = await userAuthService.setUserImage({ userId, imageName })

            res.status(200).json({ updatedUser })
        } catch (error) {
            next(error)
        }
    })

userAuthRouter.put("/:id/img/delete",
    login_required,
    async (req, res, next) => {
        try {
            const userId = req.params.id
            const userInfo = await userAuthService.getUserInfo({ userId })

            if (userInfo.imageName !== "none") {
                s3Delete(userInfo.imageName)
            }

            const updatedUser = await userAuthService.setUserImage({ userId, imageName: "none" })

            res.status(200).json({ updatedUser })
        } catch (error) {
            next(error)
        }
    })

module.exports = { userAuthRouter }
