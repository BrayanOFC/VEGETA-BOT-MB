import fs from 'fs'

let rentas = global.rentas || (global.rentas = {})

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply('❌ Este comando solo funciona en grupos.')
  if (!args[0]) return m.reply(`🐉 Ingresa los días de renta.\n\nEjemplo:\n*${usedPrefix + command} 30*`)

  let dias = parseInt(args[0])
  if (isNaN(dias)) return m.reply('❌ Ingresa un número válido de días.')

  let ahora = Date.now()
  let expira = ahora + (dias * 24 * 60 * 60 * 1000)
  rentas[m.chat] = { expira, dias }

  m.reply(`✅ El bot ha sido rentado en este grupo por *${dias} día(s)*.\n\n📅 Fecha de salida: ${new Date(expira).toLocaleString()}`)
}

handler.help = ['rentarbot']
handler.tags = ['owner']
handler.command = /^rentarbot$/i
handler.group = true
handler.rowner = true

export default handler

setInterval(async () => {
  let ahora = Date.now()
  for (let id in rentas) {
    let renta = rentas[id]
    if (ahora >= renta.expira) {
      let conn = global.conn
      await conn.sendMessage(id, { text: '⚠️ El tiempo de renta ha terminado, el bot saldrá del grupo. ¡Gracias por usar el servicio!' })
      await conn.groupLeave(id)
      delete rentas[id]
    }
  }
}, 60 * 1000)