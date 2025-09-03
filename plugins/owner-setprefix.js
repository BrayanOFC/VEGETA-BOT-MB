// Adaptado por BrayanOFC 👑
// Comando: .prefix

let handler = async (m, { conn, args, usedPrefix }) => {
  let chat = global.db.data.chats[m.chat]

  // Si no hay argumento → mostrar prefijo actual
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `✨ El prefijo actual es: *${chat.prefix || usedPrefix}*`,
      m
    )
  }

  // Resetear prefijo
  if (args[0].toLowerCase() === 'reset') {
    delete chat.prefix
    return conn.reply(
      m.chat,
      `🔄 Prefijo reseteado a: *.*`,
      m
    )
  }

  // Límite de longitud (para evitar spam)
  if (args[0].length > 20) {
    return conn.reply(
      m.chat,
      '⚠️ El prefijo no puede tener más de 20 caracteres (incluye emojis o símbolos).',
      m
    )
  }

  // Guardar nuevo prefijo
  chat.prefix = args[0]
  return conn.reply(
    m.chat,
    `✅ Prefijo cambiado exitosamente a: *${chat.prefix}*`,
    m
  )
}

// Regex para invocar el comando
handler.command = /^prefix$/i
handler.tags = ['owner']
habdler.rowner = true;
export default handler