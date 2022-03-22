const { User } = require("../db")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const { setUtil } = require('../common/setUtil')

const userAuthService = {
    addUser: async ({ name, nickname, email, password }) => {

        const user = await User.findByEmail({ email })
        if (user) { // 이메일 중복 검사
            throw new Error("이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.")
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10)
        const id = uuidv4()
        const newUser = { id, name, nickname, email, password: hashedPassword }
        const createdNewUser = await User.create({ newUser })
        return createdNewUser
    },

    getUser: async ({ email, password }) => {
        const user = await User.findByEmail({ email })
        if (!user) {
            throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.")
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            correctPasswordHash
        )
        if (!isPasswordCorrect) {
            throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.")
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key"
        const token = jwt.sign({ userId: user.id }, secretKey)

        // 반환할 loginuser 객체를 위한 변수 설정
        const { id, name, description } = user

        const loginUser = {
            token,
            id,
            email,
            name,
            description,
        }

        return loginUser
    },

    getUsers: async () => {
        const users = await User.findAll()
        return users
    },

    setUser: async ({ userId, toUpdate }) => {
        let user = await User.findById({ userId })
        if (!user) {
            throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.")
        }
        const updateObject = setUtil.compareValues(toUpdate, user)
        user = await User.update({ userId, updateObject })

        return user
    },

    getUserInfo: async ({ userId }) => {
        const user = await User.findById({ userId })
        if (!user) {
            throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.")
        }
        return user
    },

    // TODO : 받은 image정보를 가공, update로 db안 imageInfo에 날려줌
    setUserImage: async ({ userId, location }) => {
        const updateObject = { imageUrl: location }

        const user = await User.update({ userId, updateObject })

        return user
    }
}

module.exports = { userAuthService }
