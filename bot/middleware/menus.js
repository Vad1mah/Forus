const { Menu } = require('@grammyjs/menu');

async function cancelConversation(ctx) {
    await ctx.reply('Отменяем запрос');
    await ctx.conversation.exit();
}

const сancelMenu = new Menu('cancelReq')
    .text('Отменить', async (ctx) => {
      await cancelConversation(ctx);
      await ctx.editMessageReplyMarkup({ reply_markup: null });
      // await ctx.deleteMessage();
    });

    
module.exports = { сancelMenu }