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

    async createTodo(id, body) {
        let result = await pool
            .query('INSERT INTO todolist (id, title, done, listId, due_date) values (default, $1, false, $2, $3) RETURNING *',
                [body.title, id, body.due_date])
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

    findTodoByIdAndUpdate(listId, todoId, todo) {
        return this.findTodoById(listId, todoId).then(data => {
            let foundTodo = data[0];
            if(foundTodo) {
                let tempTodo = {
                    title: todo.title ?? foundTodo.title,
                    done: todo.done ?? foundTodo.done,
                    due_date: todo.due_date ?? foundTodo.due_date
                }
                return pool
                    .query('UPDATE todolist SET title=$1, done=$2, due_date=$3 WHERE id=$4 AND listId=$5 RETURNING *',
                        [tempTodo.title, tempTodo.done, tempTodo.due_date, todoId, listId])
                    .then(res => res.rows)
                    .catch(err => err)
            } else {
                return data;
            }
        });
    }

    async findTodoByIdAndReplace(listId, todoId, todo) {
        let tempTodo = {
            title: todo.title ?? 'Default Title',
            done: todo.done ?? false,
            due_date: todo.due_date ?? '2021-08-20 13:00'
        }
        return await pool
            .query('UPDATE todolist SET title=$1, done=$2, due_date=$3 WHERE id=$4 AND listId=$5 RETURNING *',
                [tempTodo.title, tempTodo.done, tempTodo.due_date, todoId, listId])
            .then(res => res.rows)
            .catch(err => err)
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
