let express = require("express")
let morgan = require("morgan")
const session = require('express-session')

let settings = require("./commons/settings")
let JSONResponse = require("./commons/JSONResponse")

let app = express()

// 公开静态资源，确保路径指向正确的public目录
app.use('/public', express.static(__dirname + '/public'));
//const express = require('express');
// 设置静态资源访问路径
//app.use(express.static('../public'));

app.use(session({
    secret: settings.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// 请求日志
app.use(morgan("dev"))
// 解决跨域,所有路径
app.all("*", (req, resp, next) => {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    resp.header("Access-Control-Allow-Origin", settings.ALLOW_ORIGIN)
    // 允许的header类型
    resp.header("Access-Control-Allow-Headers", settings.ALLOW_HEADER)
    // 允许的允许的请求方式
    resp.header("Access-Control-Allow-Methods", settings.ALLOW_METHOD)
    // 允许携带cookie
    resp.header("Access-Control-Allow-Credentials", settings.ALLOW_CREDENTIAL)
    // 让options尝试请求快速结束
    if ( req.method.toLowerCase() == "options" ) resp.send(200);
    else next();
})
// 让express处理json数据
app.use(express.json())

// 中间件，这些接口要登录
app.use("/", (req, resp, next) => {
    if ( settings.REQUIRE_LOGIN_URLS.includes(req.path.replace(`/${settings.REQUEST_PREFIX}`, "")) && !req.session.user ) {
        resp.json(JSONResponse.fail("请先登录", 401))
        return
    }
    next()
})

let userRouter = require("./routes/UserRouter")
let productCategoryRouter = require("./routes/ProductCategoryRouter")
let productRouter = require("./routes/ProductRouter")
let cartRoter = require("./routes/CartRouter")
let contactRouter = require("./routes/ContactRouter")
let orderRouter = require("./routes/OrderRouter")

let testRouter = require("./routes/TestRouter")

app.use(`/${settings.REQUEST_PREFIX}/user`, userRouter)
app.use(`/${settings.REQUEST_PREFIX}/category`, productCategoryRouter)
app.use(`/${settings.REQUEST_PREFIX}/product`, productRouter)
app.use(`/${settings.REQUEST_PREFIX}/cart`, cartRoter)
app.use(`/${settings.REQUEST_PREFIX}/contact`, contactRouter)
app.use(`/${settings.REQUEST_PREFIX}/order`, orderRouter)


app.use(`/${settings.REQUEST_PREFIX}/test`, testRouter)

module.exports = app
