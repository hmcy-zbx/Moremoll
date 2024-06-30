let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")
let settings = require("../commons/settings")

/**
 * 登录
 * @param req 
 * @param resp 
 */
exports.test = (req, resp) => {
    let username = req.body.username
    let password = req.body.password
     // 验证账号密码
     if ( !username ) {
        resp.json(JSONResponse.fail("用户名不能为空", 400))
        return
    }
    if ( !password ) {
        resp.json(JSONResponse.fail("密码不能为空", 400))
        return
    }

    db.queryOne("select * from user where username = ? and password = ?", username, password)
        .then(res => {
            if ( res ) {
                req.session.user = res
                resp.json(JSONResponse.success(null, 200, "登录成功"))
            }
            else resp.json(JSONResponse.fail("用户名或密码错误"))
        })
}


