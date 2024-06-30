let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")

/**
 * 获取商品分类列表
 * @param req 
 * @param resp 
 */
exports.list = (req, resp) => {
    db.query("select * from product_category")
        .then(res => {
            // console.log('aaa'+res)
            resp.json(JSONResponse.success(res))
        })
}
