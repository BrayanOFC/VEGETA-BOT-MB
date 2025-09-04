//creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import ws from 'ws'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const botname = global.botname || '❍⏤͟͟͞͞𝙑𝙀𝙂𝙀𝙏𝘼-𝙊𝙁𝘾࿐'
let tags = {
  'serbot': 'SUB BOTS',
  'main': 'ZENO INFO',
  'owner': 'DIOS CREADOR',
  'nable': 'MODO SAIYAJIN',
  'cmd': 'ESFERAS'
  // puedes agregar más secciones si quieres
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId]
    let name = await conn.getName(userId)
    let mode = global.opts?.self ? "Modo Privado " : "Modo Público "
    let totalCommands = Object.keys(global.plugins).length
    let totalreg = Object.keys(global.db.data.users).length
    let uptime = clockString(process.uptime() * 1000)

    if (!user) {
      global.db.data.users[userId] = { exp: 0, level: 1 }
      user = global.db.data.users[userId]
    }

    let { exp, level } = user
    let { min, xp, max } = xpRange(level, global.multiplier || 1)

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium
    }))

    let rango = conn?.user?.jid === userId ? 'DIOS BrayanOFC 🅥' : 'SUB-BOT KAIO '

    let menuText = `
╭━━━『🐉 ${botname.toUpperCase()} | DRAGON MENU』━━━╮
┃ ⚡ Usuario Saiyajin: ${name}
┃ 👑 Rango          : ${rango}
┃ 🌌 Universo       : ${mode}
┃ 📊 Registro Z     : ${totalreg}
┃ ⏱️ Tiempo Activo  : ${uptime}
┃ 🛠️ Comandos Totales: ${totalCommands}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

💥 *⚔️ SECCIONES DEL MENÚ ⚔️* 💥
${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag))
  if (!commandsForTag.length) return ''
  return `
╭───〔 ${tags[tag]} ${getRandomEmoji()} 〕───╮
${commandsForTag.map(menu => menu.help.map(h => `┃ ☁️${_p}${h}${menu.limit ? ' 🟡' : ''}${menu.premium ? ' 🔒' : ''}`).join('\n')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━╯`
}).filter(Boolean).join('\n')}

🔥 *© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ➳𝐁𝐫𝐚𝐲𝐚𝐧OFC* 🔥
`.trim()

    const buttons = [
      { buttonId: `${_p}ping`, buttonText: { displayText: "🏓 Ping" }, type: 1 },
      { buttonId: `${_p}estado`, buttonText: { displayText: "👑 Estado" }, type: 1 }
    ]

    await m.react('🐉') 

    // Prepara la imagen
    let imgBuffer = await (await fetch('https://files.catbox.moe/g97gzh.jpg')).buffer()
    let media = await prepareWAMessageMedia({ image: imgBuffer }, { upload: conn.waUploadToServer })

    // Genera el mensaje completo
    let msg = generateWAMessageFromContent(m.chat, {
      templateMessage: {
        hydratedTemplate: {
          imageMessage: media.imageMessage,
          hydratedContentText: menuText,
          hydratedFooterText: '🔥 By BrayanOFC 🔥',
          hydratedButtons: buttons
        }
      }
    }, { userJid: m.sender, quoted: m, contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363394965381607@newsletter',
          newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 • Update',
          serverMessageId: 100
        }
    }})

    // Envía el mensaje
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    conn.reply(m.chat, `✖️ Menú en modo Dragon Ball falló.\n\n${e}`, m)
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'allmenu', 'menú']
handler.register = true

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getRandomEmoji() {
  const emojis = ['🐉', '🎆', '⚡', '🔥', '🌌', '💥']
  return emojis[Math.floor(Math.random() * emojis.length)]
}