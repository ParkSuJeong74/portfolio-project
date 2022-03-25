const dotenv = require('dotenv').config()
const passport = require("passport")
const { User } = require('../../db')
// const { v4: uuidv4 } = require("uuid")
const NaverStrategy = require("passport-naver").Strategy


const naver = () => {
    passport.use(new NaverStrategy({
        clientID: process.env.Naver_Client_ID,
        clientSecret: process.env.Naver_Client_Secret,
        callbackURL: "/sns/naver/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findByEmail({
                    email: profile.emails[0].value
                })
                if (!user) {
                    const newUser = {
                        id: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        nickname: profile.displayName,
                        provider: profile.provider
                    }
                    user = await User.create({ newUser })
                }
                done(null, user)
            } catch (error) {
                console.error("Error ", error)
                done(error)
            }
        }
    ))
}

module.exports = { naver }
