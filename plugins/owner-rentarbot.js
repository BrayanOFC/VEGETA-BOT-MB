let rentas = global.rentas || (global.rentas = {})

const handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!isOwner) return
  if (m.isGroup) return
  if (!args[0]) return

  let dias = parseInt(args[0])
  if (isNaN(dias)) return

  let ahora = Date.now()
  let expira = ahora + (dias * 24 * 60 * 60 * 1000)
  rentas[m.chat] = { expira, dias }

  m.reply(`✅ Renta activada por ${dias} día(s).\n📅 Salida: ${new Date(expira).toLocaleString()}`)
}

handler.help = ['rentarbot']
handler.tags = ['owner']
handler.command = /^rentarbot$/i
handler.rowner = true

export default handler

setInterval(async () => {
  let ahora = Date.now()
  for (let id in rentas) {
    let renta = rentas[id]
    if (ahora >= renta.expira) {
      let conn = global.conn
      try {
        if (id.endsWith('@g.us')) { 
          await conn.sendMessage(id, { text: '⚠️ El tiempo de renta terminó, el bot saldrá del grupo.' })
          await conn.groupLeave(id)
        } else {
          await conn.sendMessage(id, { text: '⚠️ El tiempo de renta terminó en este chat privado.' })
        }
        delete rentas[id]
      } catch (e) {}
    }
  }
}, 60 * 1000)