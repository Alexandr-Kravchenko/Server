import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'secret',
    database: 'todolist',
    port: 5432
});

export default pool;