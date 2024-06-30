/**
 * 操作数据库
 */

let settings = require("./settings")
let mysql = require("mysql")

// mysql链接属性
let options = {
    host: settings.DB_HOST,
    port: settings.DB_PORT,
    user: settings.DB_USER,
    password: settings.DB_PASSWORD,
    database: settings.DB_DATABASE
}

// 创建数据库连接池
let pool = mysql.createPool(options)

/**
 * 给字段名从下划线命名变成驼峰命名
 * @param field
 * @returns
 */
function _transform(field) {
    let tmp = field.split("")
    let index = 0
    while ( (index = tmp.indexOf("_")) != -1 )
        if ( index != tmp.length - 1 )
            tmp.splice(index, 2, tmp[index + 1].toUpperCase())
        else
            tmp.splice(index, 1)
    return tmp.join("")
}

function transformMain(obj) {
    if ( !obj || typeof obj === "string" ) return
    //  这里的obj可能是数组，可能是对象
    for ( let field in obj ) {
        let newFieldName = field
        //  到字段了
        if ( typeof field === "string" && field.indexOf("_") != -1 ) {
            newFieldName = _transform(field)
            obj[newFieldName] = obj[field]
            delete obj[field]
        }
        transformMain(obj[newFieldName])
    }
}

/**
 * 封装一个sql语句执行的函数，返回值为Promise，这样即可可以使用.then()，也可以使用await
 * 最基本的
 * @param sql sql语句
 * @param one 是否只查询第一条
 * @param isJoin 是否是连接查询
 * @param childArray 子数据是否为数组
 * @param args sql的参数，可变长度
 * @returns
 */
function baseQuery(sql, one, isJoin, childArray, args) {
    return new Promise((resolve,reject) => {
        // 从连接池里获取一个连接
        pool.getConnection((err, connection) => {
            // 处理获取链接时异常
            if ( err ) reject(err)
            connection.query(sql, args, (err, result) => {
                // 执行sql时出现了异常
                if ( err ) reject(err)
                // 正常返回
                else  {
                    // 给字段名从下划线命名变成驼峰命名
                    transformMain(result)
                    // end
                    // console.log(result)

                    /////// 处理连接查询
                    // check
                    if ( result.length != 0 && isJoin ) {
                        let fields = new Array()
                        for ( let field in result[0] )
                            fields.push(field)

                        // 检查是否有main
                        let notMain = true
                        for ( let field of fields )
                            if ( field == "main" ) notMain = false
                        if ( notMain ) throw Error("不知道哪个是主表，主表请起别名为 main")

                        for ( let obj of result ) {
                            Object.assign(obj, obj.main)
                            delete obj.main
                        }
                        for ( let i = 0 ; i < result.length; i++ ) {
                            //  指定子数据为数组
                            if ( childArray ) {
                                for ( let field of fields ) {
                                    //  排除main字段
                                    if ( field == "main" ) continue
                                    result[i][field] = new Array(result[i][field])
                                }
                            }
                            for ( let j = i + 1; j < result.length; j++ ) {
                                if ( result[i].id == result[j].id ) {
                                    for ( let field of fields ) {
                                        //  排除main字段
                                        if ( field == "main" ) continue
                                        //  排除一样的对象
                                        if ( ( !Array.isArray(result[i][field]) && result[i][field].id == result[j][field].id )
                                            || ( Array.isArray(result[i][field]) && result[i][field][0].id == result[j][field].id )
                                        ) continue
                                        //  不是数组
                                        if ( !Array.isArray(result[i][field]) )
                                            result[i][field] = new Array(result[i][field])
                                            result[i][field].push(result[j][field])
                                    }
                                    //因为删除了一个数据，所以j需要减1，不然会跳过原本的下一个数据
                                    result.splice(j--, 1)
                                }
                            }
                        }
                    }
                    /////// end

                    if ( Array.isArray(result) && one ) resolve(result[0])
                    resolve(result)
                }
                // 释放连接
                connection.release()
            })
        })
    })
}

/**
 * 鉴别sql是否允许运行
 * @param sql sql语句
 * @param statement 允许的语句
 */
function allowSQLStatement(sql, statements) {
    let tmp = sql
    if ( typeof sql === "object" )
        tmp = sql.sql
    if ( !Array.isArray(statements) ) throw new Error("statement必须是数组")
    for ( let i of statements ) if ( tmp.startsWith(i) || tmp.startsWith(i.toUpperCase())) return true
    return false
}

const QUERY_STATEMENTS = ["select",]
const UPDATE_STATEMENTS = ["update", "insert", "delete"]

/**
 * 查询多条数据，仅使用于select 语句
 * @param sql sql语句
 * @param args sql的参数，可变长度
 * @returns
 */
function query(sql, ...args) {
    if ( !allowSQLStatement(sql, QUERY_STATEMENTS) ) throw new Error(`[${sql}]不是一条查询语句`)
    return baseQuery(sql, false, false, false, args)
}

/**
 * 查询单条数据，如果有多条，返回第一条，仅使用于select 语句
 * @param sql sql
 * @param args sql的参数，可变长度
 */
function queryOne(sql, ...args) {
    if ( !allowSQLStatement(sql, QUERY_STATEMENTS) ) throw new Error(`[${sql}]不是一条查询语句`)
    return baseQuery(sql, true, false, false, args)
}

/**
 * 更新数据库操作，如update、insert、delete语句等
 * @param sql sql
 * @param args sql的参数，可变长度
 * @returns
 */
function update(sql, ...args) {
    if ( !allowSQLStatement(sql, UPDATE_STATEMENTS) ) throw new Error(`[${sql}]不是一条更新数据库的语句`)
    return baseQuery(sql, false, false, false, args)
}

/**
 * 连接查询
 * @param {string} sql sql语句
 * @param {boolean} isOne 是否查询一个
 * @param {boolean} childArray 子数据是否为数组
 * @param {...any} args 参数
 */
function joinQuery(sql, isOne, childArray, ...args) {
    if ( !allowSQLStatement(sql, QUERY_STATEMENTS) ) throw new Error(`[${sql}]不是一条查询语句`)
    return baseQuery({ sql, nestTables:true }, isOne, true, childArray, args)
}

module.exports = { query, queryOne, update, joinQuery }
