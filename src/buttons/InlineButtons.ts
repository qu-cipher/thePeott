import { InlineKeyboard } from "grammy";

const initKeyboard = new InlineKeyboard()
    .switchInline("💌 Invite 💌", "inv_link")
    .url("❓ FAQ ❓", "https://telegra.ph/ThePeott-Docs-FAQ-12-23").row()
    .url("ThePeott Channel", "https://t.me/ThePeott").row()
    .url("The developer's Channel", "https://t.me/QuantumCipherr").row()
    .webApp("⚡ Launch app 🚀", "https://thepeott.web.app/").row();

export default initKeyboard;