//creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import ws from 'ws'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const botname = global.botname || '❍⏤͟͟͞͞𝙑𝙀𝙂𝙀𝙏𝘼-𝙊𝙁𝘾࿐'
let tags = {
  'serbot': 'SUB BOTS',
  'info': 'ZENO INFO',
  'main': 'MENUS INFO'
}
const creador = 'BrayanOFC 👻';
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId]
    let name = await conn.getName(userId)
    let mode = global.opts?.self ? "Modo Privado " : "Modo Público "
    let totalCommands = Object.keys(global.plugins).length
    let totalreg = Object.keys(global.db.data.users).length
    let uptime = clockString(process.uptime() * 1000)

    const users = [...new Set(
      (global.conns || []).filter(conn =>
        conn.user && conn.ws?.socket?.readyState !== ws.CLOSED
      )
    )]

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
      premium: plugin.premium,
    }))

    let rango = conn?.user?.jid === userId ? 'DIOS BrayanOFC 🅥'

    let menuText = `
✪〘 🚀 GALACTIC MISSION REPORT 🚀 〙✪═╗
║ 🐉 Unidad: ${botname.toUpperCase()}
║ 👤 Clase de Guerrero: ${level}
║ 🏅 creador: ${creador}
║ 🌌 Sector Galáctico: ${mode}
║ 📂 Registros en Archivo: ${totalreg}
║ ⏱️ Tiempo de Operación: ${uptime}
║ 🛠️ Protocolos Disponibles: ${totalCommands}
╚════════════════════════════════════╝

🚀╔═ *SECCION DE MENUS* ═╗🚀
${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag))
  if (commandsForTag.length === 0) return ''
  let section = `
╔═══〔${tags[tag]} ${getRandomEmoji()}〕═══╗
${commandsForTag.map(menu => menu.help.map(help =>
  `║ ☁️${_p}${help}${menu.limit ? ' 🟡' : ''}${menu.premium ? ' 🔒' : ''}`
).join('\n')).join('\n')}
╚═════════════════════╝`
  return section
}).filter(text => text !== '').join('\n')}

 👑 © ⍴᥆ᥕᥱrᥱძ ᑲᥡ  ➳𝐁𝐫𝐚𝐲𝐚𝐧𝐎𝐅𝐂ღ 
`.trim()

    await m.react('🐉') 

    await conn.sendMessage(m.chat, {
  image: { url: 'https://files.catbox.moe/3peljt.jpg' },
  caption: menuText,
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363394965381607@newsletter',
      newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 • Update',
      serverMessageId: 100
    }
  }
}, { quoted: m })
    await conn.relayMessage(m.chat, msg.message, {})
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