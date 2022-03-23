const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy

const facebook = () => {
    passport.use(new FacebookStrategy({
        clientID: "1601698346881877",
        clientSecret: "63b34a4da9035ce82d88500c8e9fc39f",
        callbackURL: "http://localhost:5001/auth/facebook/callback",
        profileFields: ['id', 'email', 'displayName'],
        passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => {
        //db 연결 어떻게 할지 서술
    }))
}

module.exports = { facebook }