import pg from 'knex';
export default pg({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'secret',
        database: 'todolist'
    }
});