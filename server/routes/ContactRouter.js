let express = require('express')
let router = express.Router()
let contaceController = require("../controllers/ContactController")

router.get("/list", contaceController.listByUserId)

module.exports = router
