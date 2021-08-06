import pool from '../db/index.js';

export default class ListModel {

    async createList(title) {
        const result = await pool
            .query('INSERT INTO lists (id, title) values(default, $1) RETURNING *', [title])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    async removeListById(id) {
        let listId = parseInt(id);
        let result = await pool
            .query('DELETE FROM lists where id=$1 RETURNING *', [listId])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    async findAllLists() {
        const result = await pool
            .query('SELECT * FROM lists')
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

}
