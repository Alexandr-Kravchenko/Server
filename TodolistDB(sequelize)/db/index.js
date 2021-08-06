import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todolist', 'todolist_app', 'secret', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    omitNull: true,
    logging: false
});

export default sequelize;
