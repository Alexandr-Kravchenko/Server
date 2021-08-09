import TodolistModel from '../models/TodolistModel.js'

let TodoModel = new TodolistModel();

class TodolistController {
  createTodo(id, title) {
    return TodoModel.createTodo(id, title)
  }
  findTodoById(listId, todoId) {
    return TodoModel.findTodoById(listId, todoId)
  }
  updateTodoById(listId, todoId, todo) {
    return TodoModel.findTodoByIdAndUpdate(listId, todoId, todo)
  }
  findTodosCurrentDay() {
    return TodoModel.findTodosCurrentDay()
  }
  replaceTodoById(listId, todoId, todo) {
    return TodoModel.findTodoByIdAndReplace(listId, todoId, todo)
  }
  removeTodoById(listId, todoId) {
    return TodoModel.removeTodoById(listId, todoId);
  }
  findAllTodoByListId(listId, all) {
    return TodoModel.findAllTodoByListId(listId, all);
  }
  getDashboard() {
    return TodoModel.getDashboard();
  }
}

export default new TodolistController();