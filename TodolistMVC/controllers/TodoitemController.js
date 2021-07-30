import {
  find, create, findById, findByIdAndUpdate
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
}

export default new TodoitemController();