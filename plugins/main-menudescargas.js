//creado y editado por BrayanOFC
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let menuText = `
╭━━━『📥 DESCARGAS Z』━━━╮
┃ 🐉 Aquí tienes los comandos
┃ ⚡ para descargar contenido
┃ 🔥 desde diferentes plataformas
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 CAPÍTULOS Y VIDEOS 〕───╮
┃ ☁️ ${_p}play <canción o video>
┃ ☁️ ${_p}play2 <video>
┃ ☁️ ${_p}ytmp3 <link YouTube>
┃ ☁️ ${_p}ytmp4 <link YouTube>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 RECURSOS Y ARCHIVOS 〕───╮
┃ ☁️ ${_p}mediafire <link>
┃ ☁️ ${_p}tiktok <link>
┃ ☁️ ${_p}instagram <link>
┃ ☁️ ${_p}facebook <link>
┃ ☁️ ${_p}spotify <link>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 PLUS 〕───╮
┃ ☁️ ${_p}apk <nombre>
┃ ☁️ ${_p}pinterest <búsqueda>
╰━━━━━━━━━━━━━━━━━━━━━━╯

🔥 *By BrayanOFC* 🔥
`.trim()

    await m.react('📥')

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
                serverMessageId: 101
              }
            }
          }
        }
      }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    
  } catch (e) {
    conn.reply(m.chat, `✖️ Menú de descargas falló.\n\n${e}`, m)
    console.error(e)
  }
}

handler.help = ['menudescargas']
handler.tags = ['main']
handler.command = ['menudescargas', 'menudz']
handler.register = true

export default handler