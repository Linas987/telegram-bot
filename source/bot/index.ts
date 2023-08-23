import {generateUpdateMiddleware} from 'telegraf-middleware-console-time';
import {I18n} from '@grammyjs/i18n';
import {MenuMiddleware} from 'telegraf-inline-menu';
import {Telegraf} from 'telegraf';
import TelegrafSessionLocal from 'telegraf-session-local';

import {Spinner} from '../spinner/index.js';

import {MyContext} from './my-context.js';
import {menu} from './menu/index.js';
import dotenv from 'dotenv';

import { beginRoomRecruit } from '../Utility/countdown.js';
dotenv.config();

const token = process.env['BOT_TOKEN'];
const webLink = process.env['WEB_LINK']!;
if (!token) {
	throw new Error('You have to provide the bot-token from @BotFather via environment variable (BOT_TOKEN)');
}

const bot = new Telegraf<MyContext>(token);

const localSession = new TelegrafSessionLocal({
	database: 'persist/sessions.json',
});

bot.start( async context => {
	const roomKey = context.message.forward_from_chat?.id;
	context.session.game = roomKey;
	context.session.currentlyInGame=false;
	context.reply("Welcome to the Spinner arcade", {
		reply_markup: {
		  keyboard: [[{ text: "web app", web_app: { url: webLink } }]],
		},
	  })
})


bot.use(localSession.middleware());

const i18n = new I18n({
	directory: 'locales',
	defaultLanguage: 'en',
	defaultLanguageOnMissing: true,
	useSession: true,
});

bot.use(i18n.middleware());

if (process.env['NODE_ENV'] !== 'production') {
	// Show what telegram updates (messages, button clicks, ...) are happening (only in development)
	bot.use(generateUpdateMiddleware());
}

bot.command('help', async context => context.reply(context.i18n.t('help')));

bot.command('startgame', async context => {
	beginRoomRecruit(context);
	let params = context.update.message.text.split(" ").slice(1);
	let spinner = new Spinner();
	let spinnerResults=spinner.handleStartgameEvent(params);

	return context.reply(spinnerResults+" /join now in 30 seconds");
});

bot.command('whoami', async context => {
	let firstName = context.update.message.from.first_name;
	let lastName = context.update.message.from.last_name;
	let identifier = context.update.message.from.id;
	let username = context.update.message.from.username;
	let channelId = context.message.forward_from_chat?.id;
	let text = "name: "+firstName+", surname: "+lastName+", id: "+identifier+", username: "+username+", channel Id: "+channelId;

	return context.reply(text);
});


const menuMiddleware = new MenuMiddleware('/', menu);
bot.command('start', async context => menuMiddleware.replyToContext(context));
bot.command('settings', async context => menuMiddleware.replyToContext(context, '/settings/'));
bot.use(menuMiddleware.middleware());

bot.catch(error => {
	console.error('telegraf error occured', error);
});

export async function start(): Promise<void> {
	// The commands you set here will be shown as /commands like /start or /magic in your telegram client.
	await bot.telegram.setMyCommands([
		//{command: 'start', description: 'open the menu'},
		{command: 'help', description: 'show the help'},
		//{command: 'settings', description: 'open the settings'},
		{command: 'startgame', description: 'start the spinner please give the amount and bet'},
		{command: 'whoami', description: 'who Am I'},
	]);

	await bot.launch();
	console.log(new Date(), 'Bot started as', bot.botInfo?.username);
}

