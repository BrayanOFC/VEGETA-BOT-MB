let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `👑 *ᴇsᴛᴇ ᴄʜᴀᴛ ғᴜᴇ ʙᴀɴᴇᴀᴅᴏ ᴄᴏɴ ᴇxɪᴛᴏ*`, m)

}
handler.help = ['banchat']
handler.tags = ['grupo']
handler.command = ['banchat']

handler.botuser = true
handler.admin = true 
handler.group = true

export default handler