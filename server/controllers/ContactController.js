let db = require("../commons/db")
let JSONResponse = require("../commons/JSONResponse")

exports.listByUserId = (req, reps) => {
    let userId = req.session.user.id
    if ( !userId ) {
        reps.json(JSONResponse.fail("必须要有用户id"))
        return
    }
    db.query("select * from contact where user_id = ?", userId)
        .then(contants => {
            reps.json(JSONResponse.success(contants))
        })
}
