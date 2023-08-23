
import { Telegraf } from "telegraf";
import { message, callbackQuery, channelPost } from "telegraf/filters"

//console.log(process.env["BOT_TOKEN"])


const bot = new Telegraf( "6577714205:AAGrTflYRGssZXNzwCLgmMPt0wKIIeyU2Nc");     //process.env["BOT_TOKEN"]);


// cia aprasomis komandos

bot.start(ctx => {
  return ctx.reply(`Praddzia as esu botas ir apie tave zinau: VArda - ${ctx.update.message.from.first_name},pavarde - ${ctx.update.message.from.last_name}, ID - ${ctx.update.message.from.id}!, user name - ${ctx.update.message.from.username}`);
});
bot.help((ctx) => ctx.reply('Help message - stai ka galima daryti '));



//bot.on("message", ctx => {
//	return ctx.reply(`Hello your message was -  ${ctx.update.message}!`);
//});



// filtruoja messages 
bot.on(message("text"), async ctx => {
	await ctx.sendMessage(`Komanda - ${ctx.update.message.text}`);


    switch(ctx.update.message.text) { 
        case "vienas": { 
            await ctx.sendMessage(`vienas - lauke ne karys`);
           break; 
        } 
        case "du": { 
            await ctx.sendMessage(`du - tikrai nepiemo`);
           break; 
        } 
        default: { 
            await ctx.sendMessage(`nezinau tokios komandos`);
           break; 
        } 
     } 
});


bot.launch();
