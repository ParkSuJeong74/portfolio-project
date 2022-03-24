const express = require("express")
const passport = require("passport")

const oAuthRouter = express.Router()

oAuthRouter.get("/facebook", passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["publice_profile", "email"]
}))

oAuthRouter.get("/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/"
}), function (req, res) {
    res.redirect("http://localhost:3000")
}
)

oAuthRouter.get('/naver', passport.authenticate("naver", null), (req, res) => {
    console.log("main")
})

oAuthRouter.get('/naver/callback', passport.authenticate("naver", {
    failureRedirect: "/"
}), (req, res) => {
    res.status(200).send(req.user)
})

module.exports = { oAuthRouter }
