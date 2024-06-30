let express = require('express')
let router = express.Router()
let userController = require("../controllers/UserController")

router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/profile", userController.profile)

module.exports = router
