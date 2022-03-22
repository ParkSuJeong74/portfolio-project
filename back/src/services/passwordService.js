const { User } = require("../db")
const bcrypt = require("bcrypt")

const passwordService = {
    getUser: async ({ email }) => {
        // 이메일 DB에 존재 여부 확인
        const user = await User.findByEmail({ email })
        if (!user) {
            throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.")
        }
        
        return user
    },
    setUser: async ({ email, newPassword, confirmPassword }) => {
        let user
        if (newPassword == confirmPassword) {
            // 새로운 비밀번호 해쉬화 한 뒤 업데이트
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user = await User.updatePassword({ email, newPassword: hashedPassword })
        } else {
            throw new Error("비밀번호 확인이 일치하지 않습니다.")
        }

        return user
    },
}

module.exports = { passwordService }
