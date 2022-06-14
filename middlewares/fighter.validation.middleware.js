const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    
    try {
        if (req.body.id) {
            throw new Error('Id should not be entered.');
        }

        if (!Object.keys(req.body).length) {
            throw new Error('Cannot create fighter. There is no data.');
        }

        const { defense, power, name } = req.body;

        if (!defense || !name || !power) {
            throw new Error('Missed one of the required fields.');
        }

        Object.keys(req.body).forEach((key) => {
            if (!user.hasOwnProperty(key)) {
              throw new Error("There are excessive fields.");
            }
        });

        if (typeof power != "number") {
            throw new Error('Invalid input. The amount of power should be a number.');
        }

        if (power < 1 || power > 100) {
            throw new Error('Invalid input. The amount of power should be from 1 to 100.');
        }

        if (typeof defense != "number") {
            throw new Error('Invalid input. The amount of defense should be a number.');
        }

        if (defense < 1 || defense > 10) {
            throw new Error('Invalid input. The amount of defense should be from 1 to 10.');
        }

        if (typeof req.body.health != "number") {
            throw new Error('Invalid input. The amount of health should be a number.');
        }

        if (req.body.health < 80 || req.body.health > 120) {
            throw new Error('Invalid input. The amount of health should be from 80 to 120.');
        }
        
        if (!req.body.health) {
            req.body.health = 100;
        }
        
    } catch (error) {
        res.badRequest = true;
        res.message = error.message;
    }

    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;