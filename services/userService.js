const { UserRepository } = require('../repositories/userRepository');

class UserService {
    // DONE
    // TODO: Implement methods to work with user

    showUserList(users) {
        const items = UserRepository.getAll(users);
        if(items.length === 0) {
            return null;
        }
        return items;
    }

    createUser(input) {
        const { phoneNumber, email } = input;

        if (!!this.search({ phoneNumber }) || !!this.search({ email })) {
            throw new Error('Cannot add new user. There is user with such email / phone number.');
        }

        const newUser = UserRepository.create(input);
        return newUser;
    }

    updateUser(id, ChangedData) {
        if (!this.search({ id })) {
            throw new Error('Cannot update. User not found.');
        }

        if (this.search({ email: ChangedData.email }) || this.search({ phoneNumber: ChangedData.phoneNumber })) {
            throw new Error('Cannot update data. There is user with such email / phone number.');
        }

        const updated = UserRepository.update(id, ChangedData);

        if(!updated) {
            throw new Error('Cannot update. User not found.');
        }
        
        return updated;
    }

    deleteUser(id) {
        const deletion = UserRepository.delete(id);
        if(deletion.length === 0) {
            return null;
        }

        return deletion;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();