const { user } = require('../models/user');
//const UserService = require('../services/userService');

const emailTemp = /^\w+([.-]?\w+)*@gmail.com/;
const phoneNumberTemp = /\+380[0-9]{9}$/;

const createUserValid = (req, res, next) => {
    // DONE
    // TODO: Implement validatior for user entity during creation

    try {
        if (req.body.id) {
            throw new Error('Id should not be entered.');
        }

        if (!Object.keys(req.body).length) {
            throw new Error('Cannot create user. There is no data.');
        }

        const { firstName, lastName, email, phoneNumber, password } = req.body;

        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            throw new Error('Missed one of the required fields.');
        }

        Object.keys(req.body).forEach((key) => {
            if (!user.hasOwnProperty(key)) {
              throw new Error("There are excessive fields.");
            }
        });

        if (password.length < 3) {
            throw new Error('Invalid input. Length of the password should be more than 3.');
        }

        if (!email.match(emailTemp)) {
            throw new Error('Invalid input. Email should be only in gmail format.');
        }
    
        if (!phoneNumber.match(phoneNumberTemp)) {
            throw new Error('Invalid input. Phone number should begin with +380.');
        }
    } catch (error) {
        res.badRequest = true;
        res.message = error.message;
    }

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    try {
        if (req.body.id) {
            throw new Error('Id should not be entered.');
        }

        if (!Object.keys(req.body).length) {
            throw new Error('Cannot update user. There is no data.');
        }

        Object.keys(req.body).forEach((key) => {
            if (!Object.keys(user).includes(key))
                throw new Error('Invalid input.');
            switch (key) {
                case "email":
                if (!req.body.email.match(emailTemplate)) {
                    throw new Error('Invalid input. Email should be only in gmail format.');
                }
                break;
                case "phoneNumber":
                if (!req.body.phoneNumber.match(phoneNumberTemplate)) {
                    throw new Error('Invalid input. Phone number should begin with +380.');
                }
                break;
                case "password":
                if (req.body.password.length < 3) {
                    throw new Error('Invalid input. Length of the password should be more than 3.');
                }
                break;
                case "firstName":
                if (!req.body.firstName) {
                    throw new Error('Invalid input. Empty firstname field.');
                }
                break;
                case "lastName":
                if (!req.body.lastName) {
                    throw new Error('Invalid input. Empty lastnamefield.');
                }
                break;
            }
        });
        } catch (error) {
            res.badRequest = true;
            res.message = error.message;
        }

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;