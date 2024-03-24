const { doQueryRandomItem } = require('../sql/utils');

async function handleStart(ctx) {
  await ctx.reply(
    'Привет, октагон!\n\n' +
    'Воспользуйся командой /help чтобы получить список команд'
  );
}

async function handleHelp(ctx) {
  await ctx.reply(
    'Это тестовый бот, пока что с примитивными командами :)\n\n' +
    'Ниже список команд, которые могут тебе помочь:\n\n' +
    '/help - вернуть список команд\n' +
    '/start - получить приветственное сообщение\n' +
    '/site - получить ссылку на сайт октагона\n' +
    '/creator - получить ФИО создателя\n\n' +
    'Sql запросы:\n\n' +
    '/randomItem - вернуть случайную запись из таблицы бд\n' +
    '/deleteItem - удалить запись из таблицы бд\n' +
    '/getItemByID - вернуть запись из таблицы бд по ID'
  );
}

async function handleGetOctLink(ctx) {
  await ctx.reply('Ссылка на сайт октагона: https://students.forus.ru/');
}

async function handleGetCreator(ctx) {
  await ctx.reply('Инициалы создателя: Исполатов Вадим Петрович');
}

async function handleRandomItem(ctx) {
  const answ = await doQueryRandomItem();
  await ctx.reply(answ);
}

async function handleDeleteItem(ctx) {
  await ctx.conversation.enter('deleteById');
}

async function handleGetItemByID(ctx) {
    await ctx.conversation.enter('searchById');
}


module.exports = { handleStart, handleHelp,
                  handleGetOctLink, handleGetCreator,
                  handleRandomItem, handleDeleteItem,
                  handleGetItemByID
                }