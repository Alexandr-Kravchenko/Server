import Sequelize from "sequelize";
import sequelize from "../db/index.js";
import { todolist } from "./todolist.js";

const DataTypes = Sequelize.DataTypes;

const lists = sequelize.define('lists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: 'Default Title'
    }
}, {
    sequelize,
    modelName: 'lists',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

lists.hasMany(todolist, {
    foreignKey: {
        name: 'id'
    }
});

todolist.belongsTo(lists, {
    foreignKey: {
        name: 'listid'
    }
});


// lists.sync()

class ListModel {

    async createList(title) {
        const result = await lists.create({ title });
        return result;
    }

    async removeListById(id) {
        let result = await lists.destroy({
            where: { id }
        });
        return result;
    }

    async findAllLists() {
        const result = await lists.findAll();
        return result;
    }

    async findListById(id) {
        const result = await lists.findAll({
            where: { id }
        });
        return result;
    }
}

export { ListModel, lists }