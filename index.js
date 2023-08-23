"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
//console.log(process.env["BOT_TOKEN"])
const bot = new telegraf_1.Telegraf("6577714205:AAGrTflYRGssZXNzwCLgmMPt0wKIIeyU2Nc"); //process.env["BOT_TOKEN"]);
bot.start(ctx => {
    return ctx.reply(`Praddzia as esu botas ir apie tave zinau: VArda - ${ctx.update.message.from.first_name},pavarde - ${ctx.update.message.from.last_name}, ID - ${ctx.update.message.from.id}!, user name - ${ctx.update.message.from.username}`);
});
bot.help((ctx) => ctx.reply('Help message - stai ka galima daryti '));
//bot.on("message", ctx => {
//	return ctx.reply(`Hello your message was -  ${ctx.update.message}!`);
//});
bot.on((0, filters_1.message)("text"), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.sendMessage(`Komanda - ${ctx.update.message.text}`);
    switch (ctx.update.message.text) {
        case "vienas": {
            yield ctx.sendMessage(`vienas - lauke ne karys`);
            break;
        }
        case "du": {
            yield ctx.sendMessage(`du - tikrai nepiemo`);
            break;
        }
        default: {
            yield ctx.sendMessage(`nezinau tokios komandos`);
            break;
        }
    }
}));
bot.launch();
