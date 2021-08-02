import TodolistModel from './Todolist';

describe('TodolistModel test', () => {
    it('createList should create list with id, title, list [] return listId', () => {
        let testID = TodolistModel.createList('TestList');
        expect(testID).toStrictEqual({listId: 1});
    });
    it('createList should create list with id, title, list [] return listId', () => {
        let testID = TodolistModel.findAllLists();
        expect(testID).toStrictEqual({listId: 1});
    });
});