const inc = (init = 0) => () => ++init;

const genListId = inc();


class TodolistModel {
  constructor() {
    this.todolist = [];
  }

  createTodo(id, title) {
    let foundList = this.findListById(id);
    const genTodoId = inc(foundList.list.length);
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

  removeTodoById(listId, todoId) {
    let foundList = this.findListById(listId);
    let id = parseInt(todoId);
    if (foundList) {
      let foundTodoId = this.todolist.findIndex(todo => todo.id === todoId);
      if (foundTodoId !== -1) {
        foundList.splice(foundTodoId, 1)
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  createList(title) {
    let listId = genListId();
    this.todolist.push({ id: listId, title, list: [] });
    return { listId: listId };
  }

  find() {
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
      todo.done = todo.done !== undefined ? this.getBool(todo.done) : foundTodo.done;
      return Object.assign(foundTodo, todo);
    } else {
      return false;
    }
  }

  findTodoByIdAndReplace(listId, todoId, todo) {
    let foundTodo = this.findTodoById(listId, todoId);
    if (foundTodo) {
      foundTodo.title = todo.title !== undefined ? todo.title : 'default todo\'s name';
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
      console.log(type);
      return data.toLowerCase() === 'true' ? true :
        data.toLowerCase() === 'false' ? false : false;
    } else {
      return false
    }
  }
}

export default new TodolistModel();