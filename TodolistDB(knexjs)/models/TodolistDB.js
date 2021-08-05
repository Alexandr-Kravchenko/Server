import pg from '../db/index.js';

export default class TodolistModel {

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

    async createTodo(id, body) {
        let result = await pg('todolist')
            .insert({
                title: body.title,
                due_date: body.due_date ?? '2021-09-11',
                listid: id
            })
        return result;
    }

    async removeTodoById(listId, todoId) {
        let result = await pg('todolist')
            .where({ id: todoId, listid: listId })
            .del()
        return result;
    }

    async findAllTodoByListId(listId) {
        let result = await pg
            .select('*')
            .from('todolist')
            .where('listid', listId)
        return result;
    }

    async findTodoById(listId, todoId) {
        let result = await pg
            .select('*')
            .from('todolist')
            .where({ listid: listId, id: todoId })
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
                return pg('todolist')
                    .where({ id: todoId, listid: listId })
                    .update({
                        title: tempTodo.title,
                        done: this.getBool(tempTodo.done),
                        due_date: tempTodo.due_date,
                    })
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
        return await pg('todolist')
            .where({ id: todoId, listid: listId })
            .update({
                title: tempTodo.title,
                done: tempTodo.done,
                due_date: tempTodo.due_date,
            })
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
