/*// código creado por BrayanOFC no quitar creditos
let handler = async (m, { conn, args, usedPrefix }) => {
  let chat = global.db.data.chats[m.chat]

  if (!args[0]) {
    return conn.reply(m.chat, `✨ El prefijo actual es: *${chat.prefix || usedPrefix}*`, m)
  }

  if (args[0].toLowerCase() === 'reset') {
    delete chat.prefix
    return conn.reply(m.chat, `🔄 Prefijo reseteado a: *.*`, m)
  }

  if (args[0].length > 20) {
    return conn.reply(m.chat, '⚠️ El prefijo no puede tener más de 20 caracteres (incluye emojis o símbolos).', m)
  }

  chat.prefix = args[0]
  return conn.reply(m.chat, `✅ Prefijo cambiado exitosamente a: *${chat.prefix}*`, m)
}

handler.command = /^setprefix$/i   
export default handler*/