let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")
let moment = require("moment")

function getDetailById(id, details) {
    for ( let detail of details )
        if ( detail.id == id ) return detail
    return
}

exports.buy = (req, resp) => {
    let contactId = req.body.contactId
    let products = req.body.products
    let userId = req.session.user.id

    let productDetailIds = new Array()
    let queryProductDetailsSQL = "select * from product_detail where id in "
    // 生成动态sql
    queryProductDetailsSQL += " ( "
    for ( let p of products ) {
        queryProductDetailsSQL += `${p.detailId}, ` 
        productDetailIds.push(p.detailId)
    }
    // 删除最后一个逗号
    queryProductDetailsSQL = queryProductDetailsSQL.substring(0, queryProductDetailsSQL.length - 2)
    queryProductDetailsSQL += " ) "
    // 查询
    db.query(queryProductDetailsSQL, productDetailIds)
        .then(details => {
            // 计算价格
            let totalPrice = 0
            for ( let p of products ) {
                let  tmpDetail = getDetailById(p.detailId, details)
                // 计算价格
                totalPrice += p.quantity * tmpDetail.salePrice
                // if ( p.quantity > tmpDetail.stock ) {
                //     resp.json(JSONResponse.fail("库存数量不足", 500))
                //     return
                // }
            }
            // 保留两位小数
            totalPrice = totalPrice.toFixed(2)
            // 有库存，价格已经计算完毕，生成订单
            let now = new Date()
            let orderId = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`
            db.update("insert into `order` values(?, ?, ?, ?, ?, ?, ?)", orderId, totalPrice, false, now, now, contactId, userId)
                .then(insertOrderRes => {
                    // 非0为真，则插入成功
                    if ( !insertOrderRes.affectedRows ) {
                        resp.json(JSONResponse.fail("生成订单失败", 500))
                        return
                    }
                    // 插入订单详情数据
                    let currentTimeString = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                    let insertOrderDetailSQL = "insert into order_detail(quantity, create_time, update_time, order_id, product_id, detail_id) values"
                    for ( let p of products )  {
                        insertOrderDetailSQL += " ( "
                        insertOrderDetailSQL += `${p.quantity}, "${currentTimeString}", "${currentTimeString}", ${orderId}, ${p.productId}, ${p.detailId}`
                        insertOrderDetailSQL += " ) ,"
                    }
                    insertOrderDetailSQL = insertOrderDetailSQL.substring(0, insertOrderDetailSQL.length - 1)
                    db.update(insertOrderDetailSQL)
                        .then(insertOrderDetailRes => {
                            if ( !insertOrderDetailRes.affectedRows ) {
                                resp.json(JSONResponse.fail("生成订单失败", 500))
                                return
                            }
                            // 删除购物车中的数据
                            let deleteCartSQL = "delete from cart where id in "
                            deleteCartSQL += "( "
                            for ( let p of products )
                                deleteCartSQL += `${p.cartId}, `
                            deleteCartSQL = deleteCartSQL.substring(0, deleteCartSQL.length - 2)
                            deleteCartSQL += " )"
                            db.update(deleteCartSQL)
                                .then(deleteCartRes => {
                                    if ( !deleteCartRes.affectedRows ) {
                                        resp.json(JSONResponse.fail("删除购物车信息失败", 500))
                                        return
                                    }
                                    resp.json(JSONResponse.success(orderId, 200, "生成订单成功"))
                                })
                                .catch(error => {
                                    console.log(error)
                                    resp.json(JSONResponse.fail("删除购物车信息失败", 500))
                                })
                        })
                        .catch(error => {
                            console.log(error)
                            resp.json(JSONResponse.fail("生成订单信息失败", 500))
                        })
                })
                .catch(error => {
                    console.log(error)
                    resp.json(JSONResponse.fail("生成订单失败", 500))
                })
        })
}

exports.pay = (req, resp) => {
    let userId = req.session.user.id
    let orderId = req.body.id

    db.update("update `order` set paid = true where id = ? and user_id = ?", orderId, userId)
        .then(res => {
            if ( res.affectedRows ) resp.json(JSONResponse.success(null, 200, "支付成功"))
            else resp.json(JSONResponse.fail("支付失败", 500))
        })
}

exports.list = (req, resp) => {
    let userId = req.session.user.id
    db.joinQuery("select * from `order` main left join order_detail details on main.id = details.order_id left join contact contact on main.contact_id = contact.id where main.user_id = ?", 
        false, false, userId)
        .then(orders => {
            orders.forEach(e => {
                //moment将日期格式化为指定格式
                e.createTime = moment(e.createTime).format("YYYY-MM-DD HH:mm:ss")
                if ( !Array.isArray(e.details) ) {
                    e.details = new Array(e.details)
                }
            })
            resp.json(JSONResponse.success(orders))
        })
}
