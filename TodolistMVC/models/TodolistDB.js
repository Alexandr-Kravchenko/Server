import pool from '../db/index.js';

export default class TodolistModel {

    async createList(title) {
        const newList = await pool.query('INSERT INTO lists (id, title) values(default, $1) RETURNING *', [title]);
        return newList.rows[0];
    }

    async removeListById(id) {
        let listId = parseInt(id);
        let result = await pool.query('DELETE FROM lists where id=$1 RETURNING *', [listId])
        return result.rows[0];
    }

    async findAllLists() {
        const lists = await pool.query('SELECT * FROM lists');
        return lists.rows;
    }

    async findListById(id) {
        let listId = parseInt(id);
        let result = await pool.query('SELECT * FROM lists WHERE id=$1', [listId]);
        return result.rows[0];
    }

    async createTodo(id, title) {
        let listId = parseInt(id)
        let result = await pool
            .query('INSERT INTO todolist (id, title, done, listId) values (default, $1, false, $2) RETURNING *',
                [title, listId])
        return result.rows[0];
    }

    async removeTodoById(listId, todoId) {
        let foundList = this.findListById(listId);
        let id = parseInt(todoId);
/*         if (foundList) {
            let foundTodoId = foundList.list.findIndex(todo => todo.id === id);
            if (foundTodoId !== -1) {
                foundList.list.splice(foundTodoId, 1)
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        } */
        let result = pool.query('DELETE FROM todolist WHERE id=$1 AND listId=$2 RETURNING *', [id, listId]);
        return result.rows[0]


    }

    findAllTodoByListId(id) {
        let listId = parseInt(id);
        let result = this.todolist.find(list => list.id === listId);
        if (result !== undefined) {
            return result.list;
        } else {
            return false;
        }
    }


    findTodoById(listId, todoId) {
        let foundList = this.findListById(listId);
        let id = parseInt(todoId);
        if (foundList) {
            let foundTodo = foundList.list.find(todo => todo.id === id);
            if (foundTodo) {
                return foundTodo;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    findTodoByIdAndUpdate(listId, todoId, todo) {
        let foundTodo = this.findTodoById(listId, todoId);
        if (foundTodo) {
            let tempTodo = {
                done: todo.done !== undefined ? this.getBool(todo.done) : foundTodo.done,
                title: todo.title ?? foundTodo.title
            }
            return Object.assign(foundTodo, tempTodo);
        } else {
            return false;
        }
    }

    findTodoByIdAndReplace(listId, todoId, todo) {
        let foundTodo = this.findTodoById(listId, todoId);
        if (foundTodo) {
            foundTodo.title = todo.title ?? 'default todo\'s name';
            foundTodo.done = todo.done !== undefined ? this.getBool(todo.done) : false;
            return foundTodo
        } else {
            return false;
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

// export default new TodolistModel();
