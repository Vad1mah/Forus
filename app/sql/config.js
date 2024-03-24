const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'chatbottests'
});

module.exports = { pool }