import TodolistModel from '../models/Todolist.js'

class ListController {
  createTodo(id, title) {
    return TodolistModel.createTodo(id, title)
  }
  findTodoById(listId, todoId) {
    return TodolistModel.findTodoById(listId, todoId)
  }
  updateTodoById(listId, todoId, todo) {
    return TodolistModel.findTodoByIdAndUpdate(listId, todoId, todo)
  }
  replaceTodoById(listId, todoId, todo) {
    return TodolistModel.findTodoByIdAndReplace(listId, todoId, todo)
  }
  removeTodoById(listId, todoId) {
    return TodolistModel.removeTodoById(listId, todoId);
  }
  findAllTodoByListId(listId) {
    return TodolistModel.findAllTodoByListId(listId);
  }
  findAllLists() {
    return TodolistModel.findAllLists()
  }
  createList(title) {
    return TodolistModel.createList(title);
  }
  findListById(id) {
    return TodolistModel.findListById(id);
  }
  removeListById(id) {
    return TodolistModel.removeListById(id);
  }
}

export default new ListController();