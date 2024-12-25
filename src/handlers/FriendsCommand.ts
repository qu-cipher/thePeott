import HTTPTools from "../utils/HTTPTools";

async function handleGetFriendsCommand(ctx) {
    const waitMsg = await ctx.reply("Getting your friends...");
    const userId = ctx.chat.id;
    try {
        const res = await HTTPTools.get("http://localhost:80/api/player/get", { id: userId });
        let msg = `Your friends till now:`;
        const friends = Array.isArray(res.data.friends) ? res.data.friends : [];
        friends.forEach((friend: { playerTelegramId: any; username: any; balance: { coins: any; }; }) => {
            msg += ` (${friends.length})\n\t• <code>${friend.playerTelegramId}</code>:\n\t\tusername: ${friend.username}\n\t\tbalance: ${friend.balance.coins}\n`;
        });
        await ctx.reply(msg, {parse_mode: "HTML"});
    } catch (error) {
        console.error(error);
    } finally {
        await ctx.api.deleteMessage(ctx.chat.id, waitMsg.message_id);
    }
}

export default handleGetFriendsCommand;