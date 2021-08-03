import TodolistModel from './Todolist';

describe('TodolistModel test (list\'s methods)', () => {
    describe('createList', () => {
        it('createList should create list with id, title, list [] return listId', () => {
            let testModel = new TodolistModel()
            let testID = testModel.createList('TestList');
            expect(testID).toStrictEqual({ listId: 1 });
        });
    });
    describe('findAllLists', () => {
        it('findAllLists should return all list (0)', () => {
            let testModel = new TodolistModel()
            let testID = testModel.findAllLists();
            expect(testID).toStrictEqual([]);
        });

        it('findAllLists should return all list ', () => {
            let testModel = new TodolistModel()
            testModel.createList('TestList');
            testModel.createList('TestList2');
            let expectedData = [{
                "id": 1,
                "list": [],
                "title": "TestList"
            },
            {
                "id": 2,
                "list": [],
                "title": "TestList2"
            }
            ]
            expect(testModel.findAllLists()).toStrictEqual(expectedData);
        });
    });

    describe('removeListById', () => {
        it('removeListById should remove one list, return true', () => {
            let testModel = new TodolistModel()
            testModel.createList('TestList');
            testModel.createList('TestList2');
            expect(testModel.removeListById(2)).toBeTruthy();
        });

        it('removeListById should remove one list, return false, because list will not found', () => {
            let testModel = new TodolistModel();
            expect(testModel.removeListById(2)).toBeFalsy();
        });
    });

    describe('findListById', () => {
        it('findListById shoud find list by id and return one', () => {
            let testModel = new TodolistModel();
            testModel.createList('TestList');
            expect(testModel.findListById(1)).toStrictEqual({
                "id": 1,
                "list": [],
                "title": "TestList"
            })
        });

        it('findListById shoud not find list by id and return false', () => {
            let testModel = new TodolistModel();
            testModel.createList('TestList');
            expect(testModel.findListById(2)).toBeFalsy();
        });
    });
});