let rentas = global.rentas || (global.rentas = {})

const handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return
  if (m.isGroup) return m.reply('❌ Usa este comando solo en mi privado.')
  if (!args[0] || !args[1]) return m.reply(`Ejemplo:\n.rentarbot <link-grupo> <días>\n\nEjemplo:\n.rentarbot https://chat.whatsapp.com/ABCDEFG123456 30`)

  let link = args[0]
  let dias = parseInt(args[1])
  if (isNaN(dias)) return m.reply('❌ Ingresa un número válido de días.')

  let regex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
  let match = link.match(regex)
  if (!match) return m.reply('❌ Link no válido.')

  let code = match[1]

  try {
    // Unirse al grupo
    await conn.groupAcceptInvite(code)

    // Obtener info del grupo
    let metadata = await conn.groupMetadataFromInvite(code)
    let idGrupo = metadata.id

    let ahora = Date.now()
    let expira = ahora + (dias * 24 * 60 * 60 * 1000)
    rentas[idGrupo] = { expira, dias }

    m.reply(`✅ El bot entró al grupo:\n${metadata.subject}\n⏳ Tiempo: ${dias} día(s)\n📅 Salida: ${new Date(expira).toLocaleString()}`)
    
    await conn.sendMessage(idGrupo, { text: `🐉 ¡Hola! He sido rentado por ${dias} día(s).` })
  } catch (e) {
    console.log(e)
    m.reply('❌ No pude unirme al grupo o no encontré la información del grupo.')
  }
}

handler.help = ['rentarbot']
handler.tags = ['owner']
handler.command = /^rentarbot$/i
handler.rowner = true

export default handler

// Auto-salida cuando expire
setInterval(async () => {
  let ahora = Date.now()
  for (let id in rentas) {
    let renta = rentas[id]
    if (ahora >= renta.expira) {
      let conn = global.conn
      try {
        await conn.sendMessage(id, { text: '⚠️ El tiempo de renta terminó, el bot saldrá del grupo.' })
        await conn.groupLeave(id)
        delete rentas[id]
      } catch (e) {
        console.log('Error al salir del grupo:', e)
      }
    }
  }
}, 60 * 1000)