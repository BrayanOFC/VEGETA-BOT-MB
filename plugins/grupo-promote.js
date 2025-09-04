const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*${emojis} Menciona o responde al mensaje del usuario que deseas promover a administrador.*`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
  m.reply(`*✅ El usuario fue promovido a la administración.*`)
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = /^(promote|promover|daradmin|darpoder|darpija)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler