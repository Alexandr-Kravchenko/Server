import ListModel from '../models/ListModel.js'

let List = new ListModel();

class ListController {
    findAllLists() {
        return List.findAllLists()
    }
    createList(title) {
        return List.createList(title);
    }
    removeListById(id) {
        return List.removeListById(id);
    }
}

export default new ListController();