const errorResponse = (status, message) => {
    return {
        status,
        success: false,
        message,
    }
}
const successResponse = (statusCode, message, data) => {
    return {
        statusCode,
        success: true,
        message,
        data
    }
}


module.exports ={successResponse, errorResponse}