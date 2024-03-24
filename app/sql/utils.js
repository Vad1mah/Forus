const { pool } = require('../sql/config');
// Отдельная функция для обработки ошибок
const { funcsHandleErrors } = require('../extra_utils/helpers');

async function executeQuery(sql, params = []) {
    return await pool.query(sql, params);
}

// Обновление данных
async function updateSql(res, sql, params = []) {
    await funcsHandleErrors(async () => {
        await executeQuery(sql, params);
        const rows = await executeQuery('SELECT * FROM `items`');
        res.send(rows[0]);
    });
}

// Проверка существования записи
async function checkExistence(id) {
    return await funcsHandleErrors(async () => {
        const res = await executeQuery('SELECT * FROM `items` WHERE id = ?', [id]);
        return res[0].length !== 0;
    });
}

module.exports = { updateSql, checkExistence }