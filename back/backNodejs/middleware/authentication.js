const { verifytoken } = require("../util/jwt.handle");
const createHttpError = require("http-errors")
const validateToken = (req, res, next)=>{
    console.log("validate token")
    try {
        let token = req.headers.authorization || ''
        console.log("token", token)
        if( token.startsWith('Bearer ') ){
            token = token.slice(7, token.length);
        }
        const payload = verifytoken(token)
        console.log(payload, "payload de token")
        req.userId = payload.id
        return next();
    } catch (error) {
        console.error(error, "error de token")
        return next(createHttpError(401))
    }
}

module.exports = { validateToken }