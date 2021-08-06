import pg from '../db/index.js';

export default class TodolistModel {

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

    async findAllTodoByListId(listId, all) {
        if (all) {
            let result = await pg
                .select('*')
                .from('todolist')
                .where('listid', listId)
            return result;
        } else {
            let result = await pg
                .select('*')
                .from('todolist')
                .where('listid', listId)
                .andWhere('done', false)
            return result;
        }
    }

    async findTodosCurrentDay() {
        let result = await pg
            .column([{ 'todoid': 'todolist.id' }, { 'todoname': 'todolist.title' }, { 'listid': 'lists.id' }, { 'listname': 'lists.title' }])
            .select()
            .from('todolist')
            .leftJoin('lists', 'todolist.listid', 'lists.id')
            .where('todolist.due_date', new Date())
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
