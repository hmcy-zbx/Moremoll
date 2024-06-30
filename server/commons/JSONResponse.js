/**
 * 控制返回json的格式
 * @param code 代码
 * @param data 数据
 * @param message 信息
 * @returns 
 */
function _response(code, data, message) {
    return { code, data, message }
}

/**
 * 控制返回json的格式
 * @param code 代码
 * @param data 数据
 * @param message 信息
 * @returns 
 */
module.exports.response = (code, data, message) => {
    return _response(code, data, message)
}

/**
 * 成功
 * @param data
 * @param code 可选，默认200
 * @param message 可选
 */
module.exports.success = (data, code=200, message=null) => {
    return _response(code, data, message)
}

/**
 * 失败
 * @param code 
 * @param message 
 * @param data 可选
 */
module.exports.fail = (message, code, data=null) => {
    return _response(code, data, message)
}
