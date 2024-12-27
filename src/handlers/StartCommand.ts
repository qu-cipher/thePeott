import initKeyboard from "../buttons/InlineButtons";
import HTTPTools from "../utils/HTTPTools";

async function handleStartCommand(ctx, base){
    try {
        const username = ctx.chat.username ?? ctx.chat.first_name ?? `no-username-${ctx.chat.id}`;
        const userData = {
            telegramId: ctx.chat.id,
            username: username,
            avatar_url: "default",
            region: "INTERNATIONAL",
            refCode: ctx.match || "0",
        };

        if (ctx.match) {
            ctx.api.sendMessage(ctx.match.split("-")[1], `User <code>${username}</code> joined ThePeott with your invite link 🎉`, {
                parse_mode: "HTML" 
            })
        }

        console.log(`New user started the bot: ${JSON.stringify(userData)}`);
        
        const msg = await ctx.reply("Checking registration... Please wait");
        if ((await HTTPTools.get(base+'/api/player/get', {id: userData.telegramId})).data.message === "PLAYER_NOT_FOUND") {
            try{
                await HTTPTools.post(base+"/api/player/register", userData);
            } catch (e) {
                ctx.reply("An error occurred while registering your data. Please try again. If the issue persists, contact support")
            }
        }

        try {
            const response = await HTTPTools.get(`${base}/api/player/get?id=${userData.telegramId}`);
            if(response.data.playerStatus === "BANNED"){
                await ctx.reply(`Uhh dude, `
                    + `Unfortunetly your account is banned for some reasons.` 
                    + `\nIf you think this is a mistake, contact support and provide `
                    + `your account id (<code>${userData.telegramId}</code>)`, {
                        parse_mode: "HTML"
                    }
                );
            } else if (response.data.playerStatus === "SUSPENDED") {
                await ctx.reply(`Uhh dude, `
                    + `Unfortunetly your account is suspended for some reasons.` 
                    + `\nIf you think this is a mistake, contact support and provide `
                    + `your account id (<code>${userData.telegramId}</code>)`, {
                        parse_mode: "HTML"
                    }
                );
            } else {
                await ctx.reply(
                    `Welcome to ThePeott, ${userData.username} 😉! Are you ready for the deployment? 🚀\n\n` +
                    `😎 Players are able to invite their hoomies to the game before the official mini-app launch! 👀\n\n` +
                    `📌 Here is your invite code (you can share directly by clicking the button below too): ` +
                    `<a href='https://t.me/ThePeottBeta_bot?start=${response.data.inviteCode}'>${response.data.inviteCode}</a>`,
                    {
                        reply_markup: initKeyboard,
                        parse_mode: "HTML",
                    }
                );
            }

        } catch (fetchError) {
            console.error(`9001: Error fetching user data for ${userData.telegramId}`, fetchError);
            await ctx.reply(
                "An error occurred while retrieving your data. Please try again. If the issue persists, contact support and provide this code: 9001-reg-" +
                userData.telegramId
            );
        }
        await ctx.api.deleteMessage(ctx.chat.id, msg.message_id);
    } catch (generalError) {
        console.error("Unexpected error in start command", generalError);
        await ctx.reply("An unexpected error occurred. Please try again later.");
    }
}

export default handleStartCommand;