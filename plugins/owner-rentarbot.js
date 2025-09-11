let rentas = global.rentas || (global.rentas = {})

const handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return
  if (!m.isGroup) return m.reply('❌ Usa este comando solo en grupos.')

  if (!args[0]) return m.reply(`Ejemplo:\n.rentarbot 30`)

  let dias = parseInt(args[0])
  if (isNaN(dias)) return m.reply('❌ Ingresa un número válido de días.')

  let ahora = Date.now()
  let expira = ahora + (dias * 24 * 60 * 60 * 1000)
  rentas[m.chat] = { expira, dias }

  m.reply(`✅ Renta activada en este grupo por ${dias} día(s).\n📅 Salida: ${new Date(expira).toLocaleString()}`)
}

handler.help = ['rentarbot']
handler.tags = ['owner']
handler.command = /^rentarbot$/i
handler.rowner = true
handler.private = true
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
        }
        delete rentas[id]
      } catch (e) {
        console.log(e)
      }
    }
  }
}, 60 * 1000)