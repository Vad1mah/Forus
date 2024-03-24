// Апи-кей
require('dotenv').config();

// Бот, контекст, сессия
const { Bot, Context, session } = require('grammy');

// Диалоги
const {conversations, createConversation } = require('@grammyjs/conversations');

// Типы
// const { Chat } = require("grammy/types");

// Файлы
// const { InputFile } = require("https://deno.land/x/grammy@v1.21.1/mod.ts");

// Обработчики ошибок запросов
const { reqHandleErrors } = require('./utils/helpers.js');

// Меню
const { сancelMenu } = require('./middleware/menus.js');

// Диалоги
const { searchById, deleteById } = require('./middleware/conversations.js');

// Обработчики команд
const { handleStart, handleHelp,
  handleGetOctLink, handleGetCreator,
  handleRandomItem, handleDeleteItem,
  handleGetItemByID
} = require('./middleware/handlers.js');



const bot = new Bot(process.env.BOT_API_KEY);

bot.catch(reqHandleErrors);

// bot.use(async (ctx, next) => {
//   ctx.config = {
//     botDeveloper: BOT_DEVELOPER,
//     isDeveloper: ctx.from?.id === BOT_DEVELOPER,
//     TrueUsername: ctx.from.username + '_лох'
//   };
//   await next();
// })

// bot.use(responseTime);

bot.use(session({
  initial: () => ({})
}));
bot.use(conversations());

bot.use(сancelMenu);

bot.use(createConversation(deleteById),
        createConversation(searchById)
      );


bot.command('start', handleStart);
bot.command('help', handleHelp);
bot.command('site', handleGetOctLink);
bot.command('creator', handleGetCreator);
bot.command('randomItem', handleRandomItem);
bot.command('deleteItem', handleDeleteItem);
bot.command('getItemByID', handleGetItemByID);


bot.start();
