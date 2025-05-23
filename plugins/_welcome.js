import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let totalMembers = participants.length
  let date = new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })

  let frasesBienvenida = [
    "¡Esperamos que disfrutes tu estadía!",
    "Recuerda leer las reglas del grupo.",
    "Diviértete y participa en las conversaciones.",
    "¡Un placer tenerte aquí!",
    "¡Bienvenido! Esperamos que la pases genial con nosotros.",
    "¡Nuevo miembro en la casa! Siéntete como en tu hogar.",
    "¡Hola! No olvides presentarte y participar en las charlas.",
    "¡Un nuevo compañero ha llegado! Que disfrutes el grupo.",
    "¡Qué bueno verte por aquí! Esperamos que te diviertas.",
    "¡Un gusto tenerte con nosotros! Anímate a participar.",
    "¡Bienvenido! No te preocupes, aquí todos somos buena onda.",
    "¡Hola! Te estábamos esperando, siéntete libre de opinar.",
    "¡Qué alegría tenerte aquí! Disfruta del grupo.",
    "¡Un nuevo integrante ha llegado! Ponte cómodo.",
    "¡Bienvenido! Siéntete libre de compartir y disfrutar."
  ]
  let frasesDespedida = [
    "Esperamos verte pronto de nuevo.",
    "¡Suerte en tus proyectos futuros!",
    "Hasta la próxima, cuídate.",
    "Nos vemos en otra ocasión.",
    "¡Fue un placer tenerte aquí! Mucho éxito.",
    "Nos vemos, que te vaya bien en todo.",
    "¡Gracias por haber sido parte del grupo!",
    "¡Adiós! Esperamos verte en otra oportunidad.",
    "¡Te extrañaremos! Vuelve cuando quieras.",
    "Hasta luego, que la vida te sonría.",
    "¡Buena suerte en todo lo que hagas!",
    "¡Nos vemos! Que te vaya increíble.",
    "¡Hasta siempre! Te esperamos de vuelta.",
    "¡Que te vaya bien! Gracias por haber compartido con nosotros.",
    "Adiós, pero recuerda que siempre serás bienvenido de vuelta."
  ]

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)]
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)]

  let imageUrl = 'https://files.catbox.moe/ef2d5u.jpg'

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏━━━━━━━━━━━━━━━━┅┈
┃      𝔹𝕀𝔼ℕ𝕍𝔼ℕ𝕀𝔻𝕆
┣━━━━━━━━━━━━━━━━┅┈
┃ ᴜsᴜᴀʀɪᴏ: ${taguser}
┃
┃ ɢʀᴜᴘᴏ: ${groupMetadata.subject}
┃
┃ ᴍɪᴇᴍʙʀᴏs: ${totalMembers + 1}
┃
┃ ғᴇᴄʜᴀ: ${date}
┃
┗━━━━━━━━━━━━━━━━┅┈

> 𝐅𝐫𝐚𝐜𝐞 𝐝𝐞 𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚 
${fraseRandomBienvenida}` 
      await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: bienvenida, mentions: [who] })
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      let despedida = `┏━━━━━━━━━━━━━━━━┅┈
┃       𝔹.    𝔸.    𝕐.
┣━━━━━━━━━━━━━━━━┅┈
┃ ᴜsᴜᴀʀɪᴏ: ${taguser}
┃
┃ ɢʀᴜᴘᴏ: ${groupMetadata.subject}
┃
┃ ᴍɪᴇᴍʙʀᴏs: ${totalMembers - 1}
┃
┃ ғᴇᴄʜᴀ: ${date}
┃
┗━━━━━━━━━━━━━━━━┅┈
> 𝐅𝐫𝐚𝐜𝐞 𝐝𝐞 𝐝𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚
${fraseRandomDespedida}` 
      await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: despedida, mentions: [who] })
    }
  }
}