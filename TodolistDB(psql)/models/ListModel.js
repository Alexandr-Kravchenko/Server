import pool from '../db/index.js';

export default class ListModel {

    createList(title) {
        return pool
            .query('INSERT INTO lists (id, title) values(default, $1) RETURNING *', [title])
            .then(res => res.rows)
            .catch(err => err)
    }

    removeListById(id) {
        let listId = parseInt(id);
        let result = pool
            .query('DELETE FROM lists where id=$1 RETURNING *', [listId])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    findAllLists() {
        const result = pool
            .query('SELECT * FROM lists')
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

}
