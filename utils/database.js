/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:06
 * @modify date 2020-12-26 19:23:06
 * @desc [description]
 */
const mongoose = require("mongoose");
var debug = require('debug')('job-portal-api:server');


const database = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => debug("Database connected !")).catch(err => {
    debug(err)
    throw new Error("Database connection failed")
})


module.exports = database