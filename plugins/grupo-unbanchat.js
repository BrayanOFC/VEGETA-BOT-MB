let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '🔥 *¡Este chat no está registrado!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '👑 *¡𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 ɴᴏ ᴇsᴛᴀ ʙᴀɴᴇᴀᴅᴏ ᴇɴ ᴇsᴛᴇ ᴄʜᴀᴛ!*', m, r'canal)
chat.isBanned = false
await conn.reply(m.chat, '⚡ *¡𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 ʏᴀ ғᴜᴇ ᴅᴇsʙᴀɴᴇᴀᴅᴏ ᴇɴ ᴇsᴛᴇ ᴄʜᴀᴛ!*', m, r'canal)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['unbanchat','desbanearchat','desbanchat','onbot']
handler.admin = true 
handler.botadmin = true
handler.group = true

export default handler