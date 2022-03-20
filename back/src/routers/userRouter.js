const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")
const { timeUtil } = require("../common/timeUtil")

const userAuthRouter = Router()

userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const created_at = timeUtil()
    const updated_at = timeUtil()


    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
      created_at,
      updated_at
    })

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage)
    }

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.post("/user/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email
    const password = req.body.password

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password })

    if (user.errorMessage) {
      throw new Error(user.errorMessage)
    }

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.get(
  "/userlist",
  login_required,
  async (req, res, next) => {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers()
      res.status(200).send(users)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get(
  "/user/current",
  login_required,
  async (req, res, next) => {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      })

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage)
      }

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.put(
  "/users/:id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null
      const email = req.body.email ?? null
      const description = req.body.description ?? null
      const updated_at = timeUtil()

      const toUpdate = { name, email, description, updated_at }

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate })

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage)
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get(
  "/users/:id",
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.params.id
      const currentUserInfo = await userAuthService.getUserInfo({ user_id })

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage)
      }

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.put("/user/follow/:id", login_required, async (req, res, next) => {
  try {
    // My -> 내 id로 db에서 가져온 데이터, Your -> 상대 id로 db에서 가져온 데이터
    // follower -> 나를 follow하는 .. / following -> 내가 follow하는 ..
    // 상대 db에 들어갈 데이터 먼저 처리
    const userIdMy = req.params.id
    const userIdYour = req.body.userIdYour
    const userInfoYour = await userAuthService.getUserInfo({ user_id: userIdYour })
    const userInfoMy = await userAuthService.getUserInfo({ user_id: userIdMy })
    let followerYour = Object.values(userInfoYour.follower)
    let followingMy = Object.values(userInfoMy.following)

    // 값이 존재하는 경우 index, 존재하지 않는 경우 -1 반환
    const indexFollowerYour = followerYour.indexOf(userIdMy)
    const indexFollowingMy = followingMy.indexOf(userIdYour)
    // 팔로우 안한 경우
    if (indexFollowingMy === -1) {
      followerCountYour = userInfoYour.followerCount + 1
      followerYour = [...followerYour, userIdMy]
      followingCountMy = userInfoMy.followingCount + 1
      followingMy = [...followingMy, userIdYour]
    } else {
      // 팔로우 한 경우
      followerCountYour = userInfoYour.followerCount - 1
      followerYour.splice(indexFollowerYour, 1)
      followingCountMy = userInfoMy.followingCount - 1
      followingMy.splice(indexFollowingMy, 1)
    }

    const toUpdate_your = {
      followerCount: followerCountYour,
      follower: followerYour
    }
    const updatedYour = await userAuthService.setUser({
      user_id: userIdYour,
      toUpdate: toUpdate_your
    })
    if (updatedYour.errorMessage) {
      throw new Error(updatedYour.errorMessage)
    }

    const toUpdateMy = {
      followingCount: followingCountMy,
      following: followingMy
    }
    const updatedMy = await userAuthService.setUser({
      user_id: userIdMy,
      toUpdate: toUpdateMy
    })
    
    res.status(200).json({ updatedYour, updatedMy })
  } catch (error) {
    next(error)
  }
})

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, (req, res, next) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    )
})

module.exports = { userAuthRouter }
