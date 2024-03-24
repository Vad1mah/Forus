const { GrammyError, HttpError } = require('grammy');

async function funcsHandleErrors(asyncFunc) {
    try {
      const res = await asyncFunc();
      return res;
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
}

// Обработчик ошибок запросов
function reqHandleErrors(err) {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error('Ошибка в запросе:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Не удалось связаться с Telegram:', e);
    } else {
        console.error('Неизвестная ошибка:', e);
    }
}

function isNumberNotEmpty(str) {
    return !isNaN(str) && str.trim() !== '';
}

module.exports = { funcsHandleErrors, reqHandleErrors, isNumberNotEmpty }