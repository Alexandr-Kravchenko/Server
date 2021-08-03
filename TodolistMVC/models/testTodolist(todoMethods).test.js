import TodolistModel from './Todolist';

describe('TodolistModel test (todo\'s methods)', () => {
    it('createTodo should create todo and return this one ', () => {
        let testModel = new TodolistModel();
        let listId = testModel.createList('NewList').listId;
        expect(testModel.createTodo(listId, 'NewTodo')).toStrictEqual({
            title: "NewTodo",
            done: false,
            id: 1
        })
    });
    describe('removeTodoById', () => {
        it('removeTodoById should remove one todo, return true', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            testModel.createTodo(listId, 'NewTodo1');
            expect(testModel.removeTodoById(listId, 2)).toBeTruthy()
        });

        it('removeTodoById should not remove because todo will not found, return false', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            expect(testModel.removeTodoById(listId, 2)).toBeFalsy()
        });
    });

    describe('findAllTodoById', () => {
        it('findAllTodoById should return all todo of some list', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            testModel.createTodo(listId, 'NewTodo1');
            expect(testModel.findAllTodoByListId(listId)).toStrictEqual([{
                "id": 1,
                "title": "NewTodo",
                "done": false
            },
            {
                "id": 2,
                "done": false,
                "title": "NewTodo1"
            }
            ])
        });

        it('findAllTodoById should return false, because wanted list is not exist', () => {
            let testModel = new TodolistModel();
            let inCorrectId = 1;
            expect(testModel.findAllTodoByListId(inCorrectId)).toBeFalsy()
        });
    });

    describe('findTodoById', () => {
        it('findTodoById should return todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            testModel.createTodo(listId, 'NewTodo1');
            expect(testModel.findTodoById(listId, 2)).toStrictEqual({
                "id": 2,
                "done": false,
                "title": "NewTodo1"
            })
        });

        it('findTodoById should return false, because wanted list not exist', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            testModel.createTodo(listId, 'NewTodo1');
            let inCorrectId = 2;
            expect(testModel.findTodoById(inCorrectId, 2)).toBeFalsy()
        });

        it('findTodoById should return false, because wanted todo not exist', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            expect(testModel.findTodoById(listId, 2)).toBeFalsy()
        });
    });

    describe('findTodoByIdAndUpdate', () => {
        it('findTodoByIdAndUpdate should return updated todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                done: true
            }
            expect(testModel.findTodoByIdAndUpdate(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": true,
                "title": "NewTodo"
            })
        });

        it('findTodoByIdAndUpdate should return updated todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                title: 'NewTitle'
            }
            expect(testModel.findTodoByIdAndUpdate(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": false,
                "title": "NewTitle"
            })
        });

        it('findTodoByIdAndUpdate should return updated todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                title: 'NewTitle',
                done: true
            }
            expect(testModel.findTodoByIdAndUpdate(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": true,
                "title": "NewTitle"
            })
        });

        it('findTodoByIdAndUpdate should not update todo using incorrect incoming data', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                blalbla: 'NewTitle',
                whatIsIt: true
            }
            expect(testModel.findTodoByIdAndUpdate(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": false,
                "title": "NewTodo"
            })
        });

        it('findTodoByIdAndUpdate should not update not-existent todo or list, return false', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                title: 'NewTitle',
                done: true
            }
            let inCorrectId = 2;
            expect(testModel.findTodoByIdAndUpdate(listId, inCorrectId, changes)).toBeFalsy()
        });
    });

    describe('findTodoByIdAndReplace', () => {
        it('findTodoByIdAndReplace should update all todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                done: true
            }
            expect(testModel.findTodoByIdAndReplace(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": true,
                "title": "default todo\'s name"
            })
        });

        it('findTodoByIdAndReplace should update all todo', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                title: 'NewTitleForTodo'
            }
            expect(testModel.findTodoByIdAndReplace(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": false,
                "title": "NewTitleForTodo"
            })
        });

        it('findTodoByIdAndReplace can parse string for parametr "done" "true" => true', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                done: 'true',
                title: "NewTitleForTodo"
            }
            expect(testModel.findTodoByIdAndReplace(listId, 1, changes)).toStrictEqual({
                "id": 1,
                "done": true,
                "title": "NewTitleForTodo"
            })
        });

        it('findTodoByIdAndReplace can\'t update non-existent todo or list', () => {
            let testModel = new TodolistModel();
            let listId = testModel.createList('NewList').listId;
            testModel.createTodo(listId, 'NewTodo');
            let changes = {
                done: 'true',
                title: "NewTitleForTodo"
            }
            let inCorrectId = 2;
            expect(testModel.findTodoByIdAndReplace(inCorrectId, inCorrectId, changes)).toBeFalsy()
        });
    });

    describe('getBool', () => {
        it('getBool receive str return boolean', () => {
            let testModel = new TodolistModel();
            expect(testModel.getBool('True')).toBeTruthy()
        });

        it('getBool receive str return boolean', () => {
            let testModel = new TodolistModel();
            expect(testModel.getBool('TruE')).toBeTruthy()
        });

        it('getBool receive str return boolean', () => {
            let testModel = new TodolistModel();
            expect(testModel.getBool('False')).toBeFalsy()
        });

        it('getBool receive boolean return boolean ', () => {
            let testModel = new TodolistModel();
            expect(testModel.getBool(false)).toBeFalsy()
        });
    });
});