const { User } = require("../db") // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")

const userAuthService = {
  addUser: async ({ name, email, password, created_at, updated_at }) => {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email })
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      return { errorMessage }
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10)

    // id 는 유니크 값 부여
    const id = uuidv4()
    const newUser = { id, name, email, password: hashedPassword, created_at, updated_at }

    // db에 저장
    const createdNewUser = await User.create({ newUser })
    createdNewUser.errorMessage = null // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser
  },

  getUser: async ({ email, password }) => {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email })
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      return { errorMessage }
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    )
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      return { errorMessage }
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key"
    const token = jwt.sign({ user_id: user.id }, secretKey)

    // 반환할 loginuser 객체를 위한 변수 설정
    const { id, name, description } = user

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    }

    return loginUser
  },

  getUsers: async () => {
    const users = await User.findAll()
    return users
  },

  setUser: async ({ user_id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      return { errorMessage }
    }

    let updateObject = {}

    Object.entries(toUpdate)
      .forEach((element) => {
        if (element[1] !== "")
          updateObject[element[0]] = element[1]
      })

    user = await User.update({ user_id, updateObject })

    return user
  },

  getUserInfo: async ({ user_id }) => {
    const user = await User.findById({ user_id })
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      return { errorMessage }
    }

    return user
  }
}

module.exports = { userAuthService }
