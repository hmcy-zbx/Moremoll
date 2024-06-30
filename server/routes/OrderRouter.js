let express = require('express')
let router = express.Router()
let orderController = require("../controllers/OrderController")

router.post("/buy", orderController.buy)
router.post("/pay", orderController.pay)
router.get("/list", orderController.list)

module.exports = router
