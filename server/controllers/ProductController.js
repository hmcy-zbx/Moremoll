let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")

/**
 * 获取商品列表
 * @param req 
 * @param resp 
 */
exports.list = (req, resp) => {
    let categoryId =  req.query.categoryId
    let sql = "select * from product main left join product_detail details on details.product_id = main.id"
    
    if ( categoryId ) sql = "select * from product main left join product_detail details on details.product_id = main.id where main.category_id = ?"
	db.joinQuery(sql, false, true, categoryId)
        .then(res => {
            console.log(res);
            resp.json(JSONResponse.success(res))
        })
}

/**
 * 根据商品id获取商品信息
 * @param req 
 * @param resp 
 */
exports.getById = (req, resp) => {
    let id = req.params.id
    let detailId = req.query.detailId
    //  可以对id判断是否和法
    let sql = "select * from product main left join product_category category on main.category_id = category.id left join product_detail details on details.product_id = main.id where main.id = ?"
    if ( detailId ) sql += " and details.id = ?"
    db.joinQuery(sql, true, detailId ? false : true, id, detailId)
        .then(res => {
            if ( res )
                resp.json(JSONResponse.success(res))
            else
                resp.json(JSONResponse.fail("找不到商品", 404))
        })
}
