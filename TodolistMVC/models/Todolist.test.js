import TodolistModel from './Todolist';

describe('TodolistModel test', () => {
    it('createList should create list with id, title, list [] return listId', () => {
        let test = new TodolistModel()
        let testID = test.createList('TestList');
        expect(testID).toStrictEqual({listId: 1});
    });
    it('createList should create list with id, title, list [] return listId', () => {
        let test = new TodolistModel()
        let testID = test.findAllLists();
        expect(testID).toStrictEqual([]);
    });
});