import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todolist', 'postgres', 'secret', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    omitNull: true,
    logging: false
});

sequelize.sync()

export default sequelize;
