const { handleStart, handleHelp,
    handleGetOctLink, handleGetCreator,
    handleRandomItem, handleDeleteItem,
    handleGetItemByID, handleQr,
    handleWebshot,
} = require('../middleware/handlers.js');


async function checkCommands(bot) {
  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('site', handleGetOctLink);
  bot.command('creator', handleGetCreator);
  bot.command('randomItem', handleRandomItem);
  bot.command('deleteItem', handleDeleteItem);
  bot.command('getItemByID', handleGetItemByID);

  bot.on('message:entities:url', ctx => {
    const { message: { text } } = ctx;

    if (text.startsWith('!qr')) {
      handleQr(ctx);
    }
    else if (text.startsWith('!webshot')) {
      handleWebshot(ctx);
    }

  });

}


// bot.on(/^\!webshot/, handleWebshot);

module.exports = { checkCommands }