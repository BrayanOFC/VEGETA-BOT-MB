/*creado y editado por BrayanOFC
import { xpRange } from '../lib/levelling.js'
import ws from 'ws'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const botname = global.botname || '❍⏤͟͟͞͞𝙑𝙀𝙂𝙀𝙏𝘼-𝙊𝙁𝘾࿐'
let tags = {
  'serbot': 'SUB BOTS',
  'main': 'ZENO INFO',
  /*'owner': 'DIOS CREADOR',
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

    let rango = conn?.user?.jid === userId ? 'DIOS BrayanOFC 🅥' : 'SUB-BOT KAIO '

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

💥 *⚔️ SECCIONES DE MENUS⚔️* 💥
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

🔥 *© ⍴᥆ᥕᥱrᥱძ ᑲᥡ  ➳𝐁𝐫𝐚𝐲𝐚𝐧𝐎𝐅𝐂ღ* 🔥
`.trim()

    await m.react('🐉') 

    let imgBuffer = await (await fetch('https://files.catbox.moe/g97gzh.jpg')).buffer()
    let media = await prepareWAMessageMedia(
      { image: imgBuffer }, 
      { upload: conn.waUploadToServer }
    )

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          imageMessage: {
            ...media.imageMessage,
            caption: menuText,
            contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363394965381607@newsletter',
                newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 • Update',
                serverMessageId: 100
              }
            }
          }
        }
      }
    }, { userJid: m.sender, quoted: m })

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

// ✅ función que te faltaba
function getRandomEmoji() {
  const emojis = ['🐉', '🎆', '⚡', '🔥', '🌌', '💥']
  return emojis[Math.floor(Math.random() * emojis.length)]
}*/


// creado y editado por BrayanOFC 👑
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let name = conn.getName(m.sender)
    let botname = "DragonBot"
    let rango = "Guerrero Z"
    let mode = "Universo 7"
    let totalreg = 128 // ejemplo
    let uptime = "3h 22m" // ejemplo
    let totalCommands = 100
    let users = Object.keys(conn.chats)
    let energia = Math.floor(Math.random() * 20000) + 1000

    let header = `
╔═✪〘 🚀 GALACTIC MISSION REPORT 🚀 〙✪═╗
║ 🐉 Unidad: ${botname.toUpperCase()}
║ 👤 Operativo: ${name}
║ 🏅 Clase de Guerrero: ${rango}
║ 🌌 Sector Galáctico: ${mode}
║ 🔥 Nivel de Energía: ${energia}
║ 📂 Registros en Archivo: ${totalreg}
║ ⏱️ Tiempo de Operación: ${uptime}
║ 🛠️ Protocolos Disponibles: ${totalCommands}
║ 🛰️ Drones Activos: ${users.length}
╚════════════════════════════════════╝
`.trim()

    const sections = [
      {
        title: "📌 MENÚ PRINCIPAL",
        rows: [
          { title: "📥 Descargas", description: "Música, videos, tiktoks y más", rowId: `${_p}menudescargas` },
          { title: "🎮 Juegos", description: "Minijuegos y entretenimiento", rowId: `${_p}menugame` },
          { title: "👥 Grupos", description: "Herramientas de administración", rowId: `${_p}menugrupos` },
          { title: "👑 Owner", description: "Comandos exclusivos del creador", rowId: `${_p}menuowner` },
          { title: "🔞 NSFW", description: "Contenido +18", rowId: `${_p}menunsfw` },
          { title: "🗡️ RPG", description: "Sistema de aventura y gacha", rowId: `${_p}menurpg` },
          { title: "🎭 Otros", description: "Comandos generales y utilidades", rowId: `${_p}menuotros` }
        ]
      }
    ]

    const listMessage = {
      text: header,
      footer: "✨ BrayanOFC - Bot 👻",
      title: "🌌 Selecciona una categoría:",
      buttonText: "📂 Abrir Menú",
      sections
    }

    await conn.sendMessage(m.chat, listMessage, { quoted: m })
  } catch (e) {
    console.error(e)
    await m.reply("❌ Error al mostrar el menú principal (ver consola)")
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'inicio']

export default handler