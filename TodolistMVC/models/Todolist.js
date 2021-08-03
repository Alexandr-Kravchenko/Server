export default class TodolistModel {
    constructor(list = []) {
        this.todolist = list;
    }

    inc = (init = 0) => () => ++init;

    createList(title) {
        let genId = this.inc(this.todolist.length);
        let listId = genId();
        this.todolist.push({ id: listId, title, list: [] });
        return { listId: listId };
    }

    removeListById(id) {
        let listId = parseInt(id);
        let foundListId = this.todolist.findIndex(list => list.id === listId);
        if (foundListId !== -1) {
            this.todolist.splice(foundListId, 1);
            return true;
        } else {
            return false;
        }
    }

    findAllLists() {
        return this.todolist;
    }

    findListById(id) {
        let listId = parseInt(id);
        let result = this.todolist.find(list => list.id === listId);
        if (result !== undefined) {
            return result;
        } else {
            return false;
        }
    }

    createTodo(id, title) {
        let foundList = this.findListById(id);
        const genTodoId = this.inc(foundList.list.length);
        if (foundList) {
            let todo = {
                id: genTodoId(),
                title: title,
                done: false
            }
            foundList.list.push(todo);
            return todo;
        } else {
            return false
        }
    }

    removeTodoById(listId, todoId) {
        let foundList = this.findListById(listId);
        let id = parseInt(todoId);
        if (foundList) {
            let foundTodoId = foundList.list.findIndex(todo => todo.id === id);
            if (foundTodoId !== -1) {
                foundList.list.splice(foundTodoId, 1)
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
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
