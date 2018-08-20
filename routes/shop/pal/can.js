var express = require("express")
var router = express.Router()

/* GET home page. */

var chk = function(req, res, next) {
    console.log("=== cancel ===")
    next()
}

var gcb = function(req, res) {
    res.render("shop/paypal/cancel", {
        title: "cancelled",
    })
}

router.get("/shop/paypal/cancel", [chk, gcb])

module.exports = router
