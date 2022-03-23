const express = require("express")
const passport = require("passport")

const oAuthRouter = express.Router()

oAuthRouter.get("/facebook", passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["publice_profile", "email"]
}))

oAuthRouter.get("/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/" }), function(req, res) {
        res.redirect("http://localhost:3000")
    }
)

module.exports = { oAuthRouter }