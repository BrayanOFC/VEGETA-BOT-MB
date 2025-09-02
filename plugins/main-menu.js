//creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import ws from 'ws'

const botname = global.botname || '❍⏤͟͟͞͞𝙑𝙀𝙂𝙀𝙏𝘼-𝙊𝙁𝘾࿐'
let tags = {
  'serbot': 'SUB BOTS',
  'main': 'ZENO INFO',
  'owner': 'DIOS CREADOR',
  'nable': 'MODO SAIYAJIN',
  'cmd': 'ESFERAS',
  'advanced': 'TÉCNICAS',
  'game': 'COMBATE',
  'rpg': 'RPG Z',
  'group': 'UNIVERSO',
  'downloader': 'CAPSULE CORP',
  'sticker': 'FUSIONES',
  'audio': 'GRITOS',
  'search': 'RADAR',
  'tools': 'ARTEFACTOS',
  'fun': 'HUMOR Z',
  'anime': 'DB-ANIME',
  'nsfw': 'MAJIN',
  'premium': 'GOD KI',
  'weather': 'CLIMA Z',
  'news': 'NOTICIAS',
  'finance': 'ZENI',
  'education': 'MENTE Z',
  'health': 'SENZU',
  'entertainment': 'ARENA',
  'sports': 'TORNEO',
  'travel': 'KAIKAI',
  'food': 'RAMEN Z',
  'shopping': 'TIENDA DE BULMA',
  'productivity': 'MAQUINARIA Z',
  'social': 'REDES Z',
  'security': 'BARRERA',
  'custom': 'AURA PERSONAL'
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.mentionedJid?.[0] || m.sender
    let user = global.db.data.users[userId]
    let name = await conn.getName(userId)
    let mode = global.opts?.self ? "Modo Privado 🔒" : "Modo Público 🔮"
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

    let rango = conn?.user?.jid === userId ? 'DIOS BrayanOFC 🅥' //: 'SUB-BOT KAIO '

    let menuText = `
╭━━━『🐉 ${botname.toUpperCase()} | DRAGON MENU』━━━╮
┃ ⚡ Usuario Saiyajin: ${name}
┃ 👑 Rango          : ${rango}
┃ 🌌 Universo       : ${mode}
┃ 📊 Registro Z     : ${totalreg}
┃ ⏱️ Tiempo Activo  : ${uptime}
┃ 🛠️ Comandos Totales: ${totalCommands}
┃ 🌀 Sub Bots Activos: ${users.length}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

💥 *⚔️ SECCIONES DEL TORNEO DEL PODER ⚔️* 💥
${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag))
  if (commandsForTag.length === 0) return ''
  let section = `
╭───〔 ${tags[tag]} ${getRandomEmoji()} 〕───╮
${commandsForTag.map(menu => menu.help.map(help =>
  `┃ ☁️${_p}${help}${menu.limit ? ' 🟡' : ''}${menu.premium ? ' 🔒' : ''}`
).join('\n')).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━╯`
  return section
}).filter(text => text !== '').join('\n')}

🔥 *By BrayanOFC* 🔥
`.trim()

    await m.react('🐉') 

    const buttons = [
      { buttonId: `${_p}owner`, buttonText: { displayText: "👑 Owner" }, type: 1 },
      { buttonId: `${_p}ping`, buttonText: { displayText: "🏓 Ping" }, type: 1 }
    ]

    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/lzs4dl.mp4' },
      caption: menuText,
      gifPlayback: true,
      mimetype: 'video/mp4',
      fileName: 'dragon-menu.mp4',
      buttons,
      viewOnce: true,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363394965381607@newsletter',
          newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱*:·',
          serverMessageId: 100
        }
      }
    }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, `✖️ Menú en modo Dragon Ball falló.\n\n${e}`, m)
    throw e
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
  const emojis = ['🐉', '🎆']
  return emojis[Math.floor(Math.random() * emojis.length)]
}