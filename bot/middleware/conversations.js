const { doQuerySearchByiD, doQueryDeleteById } = require('../sql/utils');
const { сancelMenu } = require('../middleware/menus');

// async function responseTime(ctx, next) {
//   const before = Date.now();
//   await next();
//   const after = Date.now();
//   console.log(`Response time: ${after - before} ms`)
//}

// async function deleteItem(conversation, ctx) {
  
// }

async function searchById(conversation, ctx) {
  do {
    const { message_id, chat } = await ctx.reply('Введите валидный ID:', {reply_markup: сancelMenu});
    ctx = await conversation.wait();

    const answ = await doQuerySearchByiD(ctx);
    await ctx.reply(answ);
    
    await ctx.api.editMessageReplyMarkup(chat.id, message_id, { reply_markup: undefined });

  } while (true);
}

async function deleteById(conversation, ctx) {
  do {
    const { message_id, chat } = await ctx.reply('Введите валидный ID:', {reply_markup: сancelMenu});
    ctx = await conversation.wait();

    const answ = await doQueryDeleteById(ctx);
    await ctx.reply(answ);
    
    await ctx.api.editMessageReplyMarkup(chat.id, message_id, { reply_markup: undefined });

  } while (true);

}


module.exports = { searchById, deleteById }