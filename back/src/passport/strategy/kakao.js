const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const { User } = require("../../db/models/User")

const passports = passport.use(
    new KakaoStrategy ({
        clientID : process.env.KAKAO_ID,
        callbackURL : process.env.KAKAO_REDIRECT_URL,
    },

    async (asscessToken, refreshToken, profile, done) => {
        //console.log(profile)
        try {
            const exUser = await User.findOne({
                where : { id: profile.id, provider: 'kakao'},
            })
            if(exUser) {
                done(null, exUser) // login 성공
            } else {
                console.log("여긴 들어오나?????")
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nickname : profile.displayName,
                    id: profile.id,
                    provider: 'kakao',
                })
                done(null, newUser)
            }
        } catch(err) {
            throw new Error("카카오로그인 실패!")
            done(err)
        }
    }
)
)

module.exports = { passports }