/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:08
 * @modify date 2020-12-26 20:09:03
 * @desc [description]
 */
function SuccessResponse(message, data) {
    return {
        status: true,
        message: message,
        data: data
    }
}


function FailureResponse(message) {
    return {
        status: false,
        message: message,
    }
}


module.exports = {
    SuccessResponse,
    FailureResponse
}