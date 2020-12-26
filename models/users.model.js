/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:50
 * @modify date 2020-12-26 20:06:17
 * @desc [description]
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
})


const User = mongoose.model('users', schema)



async function getUser(skip, limit) {
    return await User.find().skip(skip).limit(limit)
}

async function getUserById(id) {
    return await User.findById(id)
}


async function getUserByCredentail({ username, password }) {
    return await User.findOne({
        $and: [
            {
                username: username
            },
            {
                password: password
            }
        ]
    })
}



async function createUser(user) {
    return await User.create(user)
}

async function deleteUserById(id) {
    return await User.findOneAndRemove({ _id: id })
}


async function updateUserById(User, id) {
    return await User.findOneAndUpdate(User, { _id: id })
}



const UserModel = {
    getUser,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
    getUserByCredentail
}

module.exports = UserModel
