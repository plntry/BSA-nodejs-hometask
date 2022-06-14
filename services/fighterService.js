const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // DONE
    // TODO: Implement methods to work with fighters

    showFighterList() {
        const items = FighterRepository.getAll();
        if(items.length === 0) {
            return null;
        }
        return items;
    }

    createFighter(input) {
        const { name } = input;

        if (this.getOneByName({ name })) {
            throw new Error('Cannot add new fighter. There is fighter with such name.');
        }

        const newUser = FighterRepository.create(input);
        
        return newUser;
    }

    updateFighter(id, ChangedData) {
        if (!this.search({ id })) {
            throw new Error('Cannot update. Fighter not found.');
        }

        if (this.search({ name: ChangedData.name })) {
            throw new Error('Cannot update data. There is fighter with such name.');
        }

        const updated = FighterRepository.update(id, ChangedData);

        if(!updated) {
            throw new Error('Cannot update. Fighter not found.');
        }
        
        return updated;
    }

    deleteFighter(id) {
        const deleted = FighterRepository.delete(id);
        if(deleted.length === 0) {
            return null;
        }

        return deleted;
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();