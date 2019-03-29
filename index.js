const Telegraf = require('telegraf');

const bot = new Telegraf('804929110:AAFP3nGP9ZF9rPwTdcsYVWJsivluEPtlTx8');
const gameShortName = 'asteroids';
const gameUrl = '<link to the game>';

const aboutMenu = Telegraf.Extra
  .markdown()
  .markup(m => m.keyboard([
    m.callbackButton('keyboard1'),
    m.callbackButton('keyboard2'),
    m.callbackButton('keyboard3'),
    m.callbackButton('keyboard4'),
    m.callbackButton('keyboard5'),
  ]));

const testMenu = Telegraf.Extra
  .markdown()
  .markup(m => m.inlineKeyboard([
    m.callbackButton('button inside chat', 'call_inline_button'),
  ]));

bot.hears('keyboard1', (ctx) => {
  console.log(new Date());
  ctx.reply('about', testMenu);
  ctx.reply('about2', testMenu);
});

bot.hears('keyboard1', (ctx) => {
  console.log(new Date());
  ctx.reply('aboutq', testMenu);
  ctx.reply('aboutq', testMenu);
});
bot.hears('keyboard2', ({ replyWithGame }) => replyWithGame(gameShortName));

bot.action('call_inline_button', ctx => ctx.answerCbQuery('answer on button action'));

bot.hears('test', (ctx) => {
  ctx.reply('answer on test and show aboutMenu', aboutMenu);
});

bot.start(ctx => ctx.reply('Welcome!'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
  console.log(inlineQuery);
  const games = [{
    id: 1,
    type: 'game',
    game_short_name: 'asteroids',
  }];
  // const results = posters.map(poster => ({
  //   type: 'photo',
  //   id: poster.id,
  //   description: poster.description,
  //   thumb_url: 'http://www.laminex.com.au/uploads/products/olympia_blue.jpg',
  //   photo_url: 'https://stmed.net/sites/default/files/blue-wallpapers-25170-256511.jpg',
  // }));
  return answerInlineQuery(games);
});
// ----------------- FILES --------------------
bot.hears('send me video', (ctx) => {
  ctx.replyWithVideo('https://d2v9y0dukr6mq2.cloudfront.net/video/preview/GTYSdDW/agriculture-sunset-slow-motion_rnvd4jr__PM.mp4');
});

bot.hears('send me photo', (ctx) => {
  ctx.replyWithPhoto('https://picsum.photos/200/300/');
});

bot.command('foo', ctx => ctx.reply('👍'));

bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl));
bot.launch();
