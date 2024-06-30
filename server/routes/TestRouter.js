let express = require('express')
let router = express.Router()
let testController = require("../controllers/TestController")

router.post("/test", testController.test)

module.exports = router
