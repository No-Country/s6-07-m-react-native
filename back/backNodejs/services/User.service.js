const User = require("../models/User")

const findUser = async (id)=> {
    return await User.findOne({ _id: id })
}
module.exports = {
    findUser
}