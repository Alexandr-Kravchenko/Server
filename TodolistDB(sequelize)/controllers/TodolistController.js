import TodolistModel from '../models/todolist.js';

const TodoModel = new TodolistModel();

class TodolistController {
  createTodo(id, title) {
    return TodoModel.createTodo(id, title)
  }
  findTodoById(listId, todoId) {
    return TodoModel.findTodoById(listId, todoId)
  }
  findTodosCurrentDay() {
    return TodoModel.findTodosCurrentDay()
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
}

export default new TodolistController();