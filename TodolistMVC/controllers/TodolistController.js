import TodolistModel from '../models/TodolistDB.js'

let TodoModel = new TodolistModel();

class ListController {
  createTodo(id, title) {
    return TodoModel.createTodo(id, title)
  }
  findTodoById(listId, todoId) {
    return TodoModel.findTodoById(listId, todoId)
  }
  updateTodoById(listId, todoId, todo) {
    return TodoModel.findTodoByIdAndUpdate(listId, todoId, todo)
  }
  replaceTodoById(listId, todoId, todo) {
    return TodoModel.findTodoByIdAndReplace(listId, todoId, todo)
  }
  removeTodoById(listId, todoId) {
    return TodoModel.removeTodoById(listId, todoId);
  }
  findAllTodoByListId(listId) {
    return TodoModel.findAllTodoByListId(listId);
  }
  findAllLists() {
    return TodoModel.findAllLists()
  }
  createList(title) {
    return TodoModel.createList(title);
  }
  findListById(id) {
    return TodoModel.findListById(id);
  }
  removeListById(id) {
    return TodoModel.removeListById(id);
  }
}

export default new ListController();