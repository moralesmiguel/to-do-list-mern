const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateToDoInput(data) {
    let errors = {};
    //Validate input
    data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.data = !isEmpty(data.data) ? data.data : "";
    //Validate user id
    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User_id field is required";
    }
    //Validating input data in to list
    if (Validator.isEmpty(data.data)) {
        errors.data = "Input is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};