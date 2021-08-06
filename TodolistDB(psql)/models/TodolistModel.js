import pool from '../db/index.js';

export default class TodolistModel {

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

    async findTodosCurrentDay() {
        let result = await pool
            .query(`SELECT todolist.id as todoid, todolist.title as todoname, lists.id as listid, lists.title as listname
                FROM todolist
                left join lists on todolist.listid=lists.id
                where todolist.due_date=$1`, [new Date()])
            .then(res => res.rows)
            .catch(err => err)
        return result;
    }

    async findAllTodoByListId(listId, all) {
        if (all) {
            let result = await pool
                .query('SELECT * FROM todolist WHERE listId=$1', [listId])
                .then(res => res.rows)
                .catch(err => err);
            return result;
        } else {
            let result = await pool
                .query('SELECT * FROM todolist WHERE listId=$1 AND done=false', [listId])
                .then(res => res.rows)
                .catch(err => err);
            return result;
        }
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
            if (foundTodo) {
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
