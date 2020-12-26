/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:36
 * @modify date 2020-12-26 20:20:39
 * @desc [description]
 */
const UserModel = require('../models/users.model');

var debug = require('debug')('job-portal-api:server');

var jwt = require('jsonwebtoken');
const { FailureResponse, SuccessResponse } = require('../utils/response');

async function getUsers(req, res) {

    try {
        let { page_number, limit } = req.body

        if (!Number(page_number) == 1 || !Number(page_number)) {
            page_number = 1
            limit = 0
        }

        if (!Number(limit)) {
            limit = 25
        }



        let skip = page_number * limit

        UserM

        let users = await UserModel.getUser(skip, limit)


        if (users.length) {
            res.send(SuccessResponse("Users fetched !!", users))
        }
        else {
            res.send(FailureResponse("Users not found !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to get users !! Something went wrong !!"))
    }
}



async function getUserProfile(req, res) {

    try {


        if (req.user) {
            res.send(SuccessResponse("Profile fetched !!", req.user))
        }
        else {
            res.send(FailureResponse("Invalid token !"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to get profile !! Something went wrong !!"))
    }
}




async function createUser(req, res) {

    try {

        let user = await UserModel.createUser(req.body)


        if (user.id) {
            res.send(SuccessResponse("User created !"))
        }
        else {
            res.send(FailureResponse("Failed to create user !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to create user !! Something went wrong !!"))
    }
}




async function getLogin(req, res) {

    try {

        let user = await UserModel.getUserByCredentail(req.body)


        if (user.id) {


            let user_instance = {
                user_id: user.id,
                username: user.username,
                role: user.role
            }
            let login_response = {
                ...user_instance,
                ... {
                    token: jwt.sign(user_instance, process.env.JWT_SECRET)
                }
            }
            res.send(SuccessResponse("Login success !", login_response))
        }
        else {
            res.send(FailureResponse("Failed to create user !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to login !! Something went wrong !!"))
    }
}






async function updateUserById(req, res) {

    try {

        if (!req.params.job_id) {
            res.send(FailureResponse("User id is required !!"))
        }


        let user = await UserModel.updateUserById(req.body, req.params.job_id)


        if (user.id) {
            res.send(SuccessResponse("User updated !"))
        }
        else {
            res.send(FailureResponse("Failed to update user !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to update user !! Something went wrong !!"))
    }
}


const UserController = {
    getUsers,
    createUser,
    getLogin,
    updateUserById,
    getUserProfile
}


module.exports = UserController