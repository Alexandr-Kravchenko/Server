import pool from '../db/index.js';

export default class TodolistModel {

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

    async findListById(id) {
        let result = await pool
            .query('SELECT * FROM lists WHERE id=$1', [id])
            .then(res => res.rows);
        return result;
    }

    async createTodo(id, title) {
        let result = await pool
            .query('INSERT INTO todolist (id, title, done, listId) values (default, $1, false, $2) RETURNING *', [title, id])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    async removeTodoById(listId, todoId) {
        let result = await pool
            .query('DELETE FROM todolist WHERE id=$1 AND listId=$2 RETURNING *', [todoId, listId])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    async findAllTodoByListId(listId) {
        let result = await pool
            .query('SELECT * FROM todolist WHERE listId=$1', [listId])
            .then(res => res.rows)
            .catch(err => err);
        return result;
    }


    async findTodoById(listId, todoId) {
        let result = await pool
            .query('SELECT * FROM todolist WHERE id=$1 AND listId=$2', [todoId, listId])
            .then(res => res.rows)
            .catch(err => err);
        return result;
    }

    async findTodoByIdAndUpdate(listId, todoId, todo) {
        let done = this.getBool(todo.done);
        if (todo.title) {
            if (todo.done) {
                let result = await pool
                    .query('UPDATE todolist SET title=$1, done=$2 WHERE id=$3 AND listId=$4 RETURNING *',
                        [todo.title, done, todoId, listId])
                    .then(res => res.rows)
                    .catch(err => err)
                return result;
            } else {
                let result = await pool
                    .query('UPDATE todolist SET title=$1 WHERE id=$2 AND listId=$3 RETURNING *',
                        [todo.title, todoId, listId])
                    .then(res => res.rows)
                    .catch(err => err);
                return result;
            }
        } else if (todo.done) {
            let result = await pool
                .query('UPDATE todolist SET done=$1 WHERE id=$2 AND listId=$3 RETURNING *',
                    [done, todoId, listId])
                .then(res => res.rows)
                .catch(err => err);
            return result;
        }
    }

    async findTodoByIdAndReplace(listId, todoId, todo) {
        let done = this.getBool(todo.done);
        if (todo.title) {
            if (todo.done) {
                let result = await pool
                    .query('UPDATE todolist SET title=$1, done=$2 WHERE id=$3 AND listId=$4 RETURNING *',
                        [todo.title, done, todoId, listId])
                    .then(res => res.rows)
                    .catch(err => err);
                return result;
            } else {
                let result = await pool
                    .query('UPDATE todolist SET title=$1, done=default WHERE id=$2 AND listId=$3 RETURNING *',
                        [todo.title, todoId, listId])
                    .then(res => res.rows)
                    .catch(err => err);
                return result;
            }
        } else if (todo.done) {
            let result = await pool
                .query('UPDATE todolist SET title=default, done=$1 WHERE id=$2 AND listId=$3 RETURNING *',
                    [done, todoId, listId])
                .then(res => res.rows)
                .catch(err => err);
            return result;
        } else {
            let result = await pool
                .query('UPDATE todolist SET title=default, done=default WHERE id=$1 AND listId=$2 RETURNING *',
                    [todoId, listId])
                .then(res => res.rows)
                .catch(err => err);
            return result;
        }
    }

    getBool(data) {
        let type = typeof (data);
        if (type === 'boolean') {
            return data
        } else if (type === 'string') {
            return data.toLowerCase() === 'true' ? true :
                data.toLowerCase() === 'false' ? false : false;
        } else {
            return false
        }
    }

}
