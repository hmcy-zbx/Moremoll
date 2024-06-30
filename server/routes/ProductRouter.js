let express = require('express')
let router = express.Router()
let productController = require("../controllers/ProductController")

router.get("/list", productController.list)
router.get("/content/:id(\\d+)", productController.getById)

module.exports = router
