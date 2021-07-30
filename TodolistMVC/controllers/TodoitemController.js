import {
  find, create, findById, findByIdAndUpdate, findByIdAndReplace
} from '../models/Todoitem.js'

class TodoitemController {
  find() {
    return find()
  }
  create(title) {
    return create(title)
  }
  findById(id) {
    return findById(id)
  }
  updateById(id, todo) {
    return findByIdAndUpdate(id, todo)
  }
  replaceById(id, todo) {
    return findByIdAndReplace(id, todo)
  }
}

export default new TodoitemController();