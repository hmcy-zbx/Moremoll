let express = require('express')
let router = express.Router()
let productCategoryController = require("../controllers/ProductCategoryController")

router.get("/list", productCategoryController.list)

module.exports = router
