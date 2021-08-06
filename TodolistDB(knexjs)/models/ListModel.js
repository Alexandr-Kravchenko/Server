import pg from '../db/index.js';

export default class ListModel {

    async createList(title) {
        const result = await pg('lists')
            .insert({ title })
        return result;
    }

    async removeListById(id) {
        let result = await pg('lists')
            .where('id', id)
            .del()
        return result;
    }

    async findAllLists() {
        const result = await pg.select('*').from('lists');
        return result;
    }

    async findListById(id) {
        let result = await pg
            .select('*')
            .from('lists')
            .where('id', id)
        return result;
    }

}
