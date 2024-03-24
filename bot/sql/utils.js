const { pool } = require('../sql/config');
const { funcsHandleErrors } = require('../utils/helpers');

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

async function telegramSqlQuery(sql, params = []) {
    return await funcsHandleErrors(async () => {
        const res = await executeQuery(sql, params);
        return res[0];
    });
}

async function doQueryRandomItem() {
  const sql = 'SELECT * FROM `items` ORDER BY RAND() LIMIT 1';

  return await funcsHandleErrors(async () => {
    const rows = await telegramSqlQuery(sql);

    const row = rows[0];
    const randomItem = `(${row.id}) - ${row.name}: ${row.desc}`;
    return randomItem;

  });

}

async function doQuerySearchByiD(ctx) {
  const sql = 'SELECT * FROM `items` WHERE `id` = ?';
  const idToSearch = ctx.message?.text;

  return await funcsHandleErrors(async () => {
    const rows = await telegramSqlQuery(sql, [idToSearch]);

    if (rows[0]) {
      const row = rows[0];
      const item = `(${row.id}) - ${row.name}: ${row.desc}`;
      return item;

    } else {
      return 'Ошибка, записи по такому ID нет';
    }  

  });

}

async function doQueryDeleteById(ctx) {
  const sql = 'SELECT * FROM `items` WHERE `id` = ?';
  const idToSearch = ctx.message?.text;

  return await funcsHandleErrors(async () => {
    const rows = await telegramSqlQuery(sql, [idToSearch]);

    if (rows[0]) {
      const sql = 'DELETE FROM `items` WHERE `id` = ? LIMIT 1';
      await telegramSqlQuery(sql, [idToSearch]);
      return 'Запись успешно удалена';

    } else {
      return 'Ошибка, записи по такому ID нет';
    }

  });

}

async function generateQr(ctx) {
  const { message: { text } } = ctx;
  const url = text.substring(3).trim();
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;
  return `[✏️](${qrImage}) Qr-код на: ${url}`;
}

async function generateWebshot(ctx) {
  const { message: { text } } = ctx;
  const url = text.substring(8).trim();
  const image = 'https://api.letsvalidate.com/v1/thumbs/?url=' + url + '&width=1280&height=720';
  return `[📷](${image}) Изображение на: ${url}`;
}


module.exports = { updateSql, checkExistence,
                  doQuerySearchByiD, doQueryDeleteById,
                  doQueryRandomItem, generateQr,
                  generateWebshot
                }