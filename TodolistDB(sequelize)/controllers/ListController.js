import { ListModel } from '../models/lists.js'

const List = new ListModel();

class ListController {
  findAllLists() {
    return List.findAllLists()
  }
  createList(title) {
    return List.createList(title);
  }
  findListById(id) {
    return List.findListById(id);
  }
  removeListById(id) {
    return List.removeListById(id);
  }
}

export default new ListController();