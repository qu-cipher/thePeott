import { Bot, InlineQueryResultBuilder } from "grammy";
import handleStartCommand from './handlers/StartCommand'
import handleGetFriendsCommand from './handlers/FriendsCommand'

import dotenv from "dotenv";
import {
    CommandGroup,
  } from "@grammyjs/commands";
  
dotenv.config();

const base = process.env.BASE_URL;
const token = process.env.BOT_TOKEN;

const bot = new Bot(token);
console.log("Bot has started successfully.");

const botCommands = new CommandGroup();
botCommands.command("start", "Start bot / Check registration", c => {handleStartCommand(c, base)});
botCommands.command("friends", "Check hoomies you have invited", c => {handleGetFriendsCommand(c, base)});

bot.use(botCommands);

bot.on("inline_query", (ctx) => {
    const result = InlineQueryResultBuilder.article(
        "id:share_inv_code",
        "Invite your mate",
        {
            thumbnail_url: "https://jdfownxtvjjahgsuqyaq.supabase.co/storage/v1/object/sign/bot_assets/invite_thumbnail.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJib3RfYXNzZXRzL2ludml0ZV90aHVtYm5haWwucG5nIiwiaWF0IjoxNzM1MDQzNzU2LCJleHAiOjIwNTA0MDM3NTZ9.R926-Nvcb61xUwi8EWmieKOsye4F7QOcl6QzFcRpYU8",
            description: 'Share your invite link to a friend',
        }
    ).text(
        "Come join me on ThePeott and lets prepare ourselves for the release!\n👇 Click the link below 👇\n\n" +
        `<a href='https://t.me/ThePeottBeta_bot?start=pt-${ctx.from?.id}'>══✿══╡°˖✧ ThePeott ✧˖°╞══✿══</a>`,
        { parse_mode: "HTML" }
    );

    ctx.answerInlineQuery([result], { cache_time: 0 });
});

bot.start();
