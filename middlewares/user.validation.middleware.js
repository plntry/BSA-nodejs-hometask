const { user } = require('../models/user');
const { use } = require("chai");
const { last } = require("lodash");

const createUserValid = (req, res, next) => {
    // DONE
    // TODO: Implement validatior for user entity during creation

    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        if (req.body?.id) {
            throw new Error('Id should not be entered.');
          }

        if (!(firstName || lastName || email || phoneNumber || password)) {
            throw new Error('Missed one of the required fields.');
        }

        Object.keys(req.body).forEach((key) => {
            if (!user.hasOwnProperty(key)) {
              throw new Error("There are excessive fields.");
            }
        });

        const emailTemp = /^\w+([.-]?\w+)*@gmail.com/;
        const phoneNumberTemp = /\+380[0-9]{9}$/;

        if (password.length < 3) {
            throw new Error('Invalid input');
        }

        if (!email.match(emailTemp)) {
            throw new Error('Invalid input');
        }
    
        if (!phoneNumber.match(phoneNumberTemp)) {
            throw new Error('Invalid input');
        }
    } catch (error) {
        res.notFound = true;
        res.message = error.message;
    }

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;