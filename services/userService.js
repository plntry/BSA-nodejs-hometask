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
        const newUser = UserRepository.create(input);
        if(!newUser) {
            return null;
        }

        return newUser;
    }

    updateUser(id, dataToChange) {
        const updated = UserRepository.update(id, dataToChange);
        if(!updated) {
            return null;
        }
        
        return updated;
    }

    deleteUser(id) {
        const deleted = UserRepository.delete(id);
        if(deleted.length === 0) {
            return null;
        }

        return deleted;
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