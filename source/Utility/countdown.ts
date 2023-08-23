import { NarrowedContext } from "telegraf";
import { MyContext } from "../bot/my-context";
import { Message, Update } from "telegraf/typings/core/types/typegram";


export function beginRoomRecruit(context : NarrowedContext<MyContext, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>){
    setTimeout(()=>{
        console.log(context.session.game);
        context.reply("the countdown has ended");
    }, 30000);
}