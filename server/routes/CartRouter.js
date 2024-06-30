let express = require('express')
let router = express.Router()
let cartController = require("../controllers/CartController")

router.post("/add", cartController.addCart)
router.get("/list", cartController.listByUserId)
router.post("/delete", cartController.deleteById)
router.post("/checked", cartController.changeChecked)
router.post("/quantity", cartController.changeQuantity)

module.exports = router
