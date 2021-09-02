import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";
import { lists } from "./lists.js";
const DataTypes = Sequelize.DataTypes
const Op = Sequelize.Op;

const todolist = sequelize.define('todolist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: 'Default Title'
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    due_date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    listid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'todolist',
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

class TodolistModel {

    async createTodo(id, body) {
        let result = await todolist
            .create({
                title: body.title,
                due_date: body.due_date,
                listid: id
            });
        return result;
    }

    async removeTodoById(listId, todoId) {
        let result = await todolist.
            destroy({
                where: {
                    id: todoId,
                    listid: listId
                }
            })
        return result;
    }

    async findAllTodoByListId(listId, all) {
        if (this.getBool(all)) {
            let result = await todolist
                .findAll({
                    where: {
                        listid: listId
                    }
                })
            return result;
        } else {
            let result = await todolist
                .findAll({
                    where: {
                        listid: listId,
                        done: false
                    }
                })
            return result;
        }
    }

    async findTodoById(listId, todoId) {
        let result = await todolist
            .findOne({
                where: {
                    listid: listId,
                    id: todoId
                }
            })
        return result;
    }

    async findTodosCurrentDay() {
        let result = await todolist
            .findAll({
                where: {
                    due_date: new Date(),
                    done: false
                },
                include: {
                    model: lists,
                    attributes: ['title']
                }
            })
        return result;
    }

    async getDashboard() {
        let result = {}
        result.amount = await todolist
            .findAll({
                where: {
                    due_date: {
                        [Op.between]: [new Date(), new Date()]
                    }
                },
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('*')), 'todos_for_today'],
                ]
            }).then(data => {
                return data[0].dataValues.todos_for_today
            });

        result.listData = await todolist.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('*')), 'incomplete'],
            ],
            where: {
                done: false
            },
            include: {
                model: lists,
                attributes: [
                    ['id', 'list_id'],
                    ['title', 'list_name'],
                ],
            },
            group: ['list.id']

        })

        return result;
    }

    findTodoByIdAndUpdate(listId, todoId, todo) {
        return this.findTodoById(listId, todoId).then(data => {
            if (data) {
                let foundTodo = data.dataValues;
                let tempTodo = {
                    title: todo.title ?? foundTodo.title,
                    done: todo.done ?? foundTodo.done,
                    due_date: todo.due_date ?? foundTodo.due_date
                }
                return todolist.update({
                    title: tempTodo.title,
                    done: this.getBool(tempTodo.done),
                    due_date: tempTodo.due_date,
                }, {
                    where: {
                        id: todoId,
                        listid: listId
                    }
                })
            } else {
                return data;
            }
        });
    }

    async findTodoByIdAndReplace(listId, todoId, todo) {
        let tempTodo = {
            title: todo.title ?? 'Default Title',
            done: todo.done ?? false,
            due_date: todo.due_date ?? '2021-08-20 13:00'
        }
        return await todolist.update({
            title: tempTodo.title,
            done: this.getBool(tempTodo.done),
            due_date: tempTodo.due_date,
        }, {
            where: {
                id: todoId,
                listid: listId
            }
        })
    }

    getBool(data) {
        let type = typeof (data);
        if (type === 'boolean') {
            return data
        } else if (type === 'string') {
            return data.toLowerCase() === 'true' ? true :
                data.toLowerCase() === 'false' ? false : false;
        } else {
            return false
        }
    }

}

export { TodolistModel, todolist };