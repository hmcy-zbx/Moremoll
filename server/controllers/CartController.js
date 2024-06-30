let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")


exports.addCart = (req, resp) => {
    let data = req.body
    // {"quantity":1,"productId":1,"detailId":2,"userId":1}
    // 这里应该要验证数据的合法性，比如用户id是否存在，储存是否足够等信息
    // 这里暂时不做验证
    db.queryOne("select * from cart where product_id = ? and detail_id = ? and user_id = ?", data.productId, data.detailId, data.userId)
        .then(cart => {
            // 如果已经存在了这条记录，只要添加就数量就好了
            // 添加之前要作库存是否足够的判断，这里暂时不作判断，否则就是回调地狱
            let now = new Date()
            if ( cart )
                db.update("update cart set quantity = quantity + ?, update_time = ? where id = ? ", data.quantity, now, cart.id)
                    .then(res => {
                        if ( !res.affectedRows ) {
                            resp.json(JSONResponse.fail("添加购物车失败", 500))
                            return
                        }
                        // 减少库存
                        db.update("update product_detail set stock = stock - ?, update_time = ? where id = ?", data.quantity, now, data.detailId)
                            .then(res => {
                                if ( res.affectedRows )
                                    resp.json(JSONResponse.success(null, 200, "添加购物车成功"))
                                //  应该有事务回滚
                                else
                                    resp.json(JSONResponse.fail("添加购物车失败", 500))
                            })
                    })
            // 否则就是插入
            else 
                db.update("insert into cart(quantity, checked, product_id, detail_id, user_id, create_time, update_time) values(?, ?, ?, ?, ?, ?, ?)", 
                        data.quantity, true, data.productId, data.detailId, data.userId, now, now)
                    .then(res => {
                        if ( !res.affectedRows ) {
                            resp.json(JSONResponse.fail("添加购物车失败", 500))
                            return
                        }
                        // 减少库存
                        db.update("update product_detail set stock = stock - ?, update_time = ? where id = ?", data.quantity, now, data.detailId)
                            .then(res => {
                                if ( res.affectedRows )
                                    resp.json(JSONResponse.success(null, 200, "添加购物车成功"))
                                //  应该有事务回滚
                                else
                                    resp.json(JSONResponse.fail("添加购物车失败", 500))
                            })
                    })
        })
}

exports.listByUserId = (req, resp) => {
    let userId = req.session.user.id
    if ( !userId ) {
        resp.json(JSONResponse.fail("不能没有用户id", 401))
        return
    }
    let checked = req.query.checked
    let sql = "select * from cart main left join product product on main.product_id = product.id left join product_detail detail on detail.id = main.detail_id where user_id = ?"
    if ( checked ) sql += " and checked = ?"
    db.joinQuery(sql, false, false, userId, checked ? 1 : 0)
        .then(res => {
            // 给每个元素加成checked属性，前台复选框要用
            res.forEach(e => {
                e.checked = e.checked ? true : false
            })
            resp.json(JSONResponse.success(res))
        })
        .catch(error => {
            console.log(error)
        })
}

exports.deleteById = (req, resp) => {
    let cartId = req.body.id
    db.queryOne("select * from cart where id = ?", cartId)
        .then(cart => {
            db.update("update product_detail set stock = stock + ?, update_time = ? where id = ?", cart.quantity, new Date(), cart.detailId)
                .then(res => {
                    if ( res.affectedRows )
                        db.update("delete from cart where id = ?", cartId)
                            .then(res => {
                                if ( res.affectedRows ) resp.json(JSONResponse.success(null, 200, "删除成功"))
                                else resp.json(JSONResponse.fail("删除失败", 500))
                            })
                    else resp.json(JSONResponse.fail("删除失败", 500))
                })
        })
}

exports.changeChecked = (req, resp) => {
    let userId = req.session.user.id
    let checked = req.body.checked
    let cartId = req.body.cartId
    let sql = "update cart set checked = ? where user_id = ? "
    if ( cartId ) sql += " and id = ?"
    db.update(sql, checked, userId, cartId)
        .then(res => {
            if ( res.affectedRows ) resp.json(JSONResponse.success(null, 200, "更新选中状态成功"))
            else resp.json(JSONResponse.fail("更新选中状态失败", 500))
        })
}

exports.changeQuantity = (req, resp) => {
    let userId = req.session.user.id
    let quantity = req.body.quantity
    /*if ( quantity < 1 ) {
        resp.json(JSONResponse.fail("数量不能小于1", 400))
        return
    }*/
    let cartId = req.body.cartId
    db.queryOne("select * from cart where id = ?", cartId)
        .then(cart => {
            if ( !cart ) {
                resp.json(JSONResponse.fail("购物车不存在", 400))
                return
            }
            db.queryOne("select * from product_detail where id = ?", cart.detailId)
                .then(productDeatil => {
                    if ( !productDeatil ) {
                        resp.json(JSONResponse.fail("商品不存在", 400))
                        return
                    }
                    // 验证库存，小于0则减少数量，增加库存。
                    // 大于0增加数量，减少库存，仅需要在减少库存的时候，验证库存即可
                    // 这里可以判断等于0的情况
                    if ( quantity - cart.quantity > 0 && productDeatil.stock < quantity - cart.quantity ) {
                        resp.json(JSONResponse.fail("库存不足", 400, cart.quantity))
                        return
                    }
                    db.update("update cart set quantity = ? where user_id = ? and id = ?", quantity, userId, cartId)
                        .then(res => {
                            if ( !res.affectedRows ) {
                                resp.json(JSONResponse.fail("更新数量失败", 500))
                                return
                            }
                            // 更新库存
                            db.update("update product_detail set stock = stock + ? where id = ?", cart.quantity - quantity, productDeatil.id)
                                .then(res => {
                                    if ( res.affectedRows ) resp.json(JSONResponse.success(null, 200, "更新数量成功"))
                                    else resp.json(JSONResponse.fail("更新数量失败", 500))
                                })
                        })
                })
        })
}
