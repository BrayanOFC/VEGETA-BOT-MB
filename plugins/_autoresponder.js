// creado y editado por BrayanOFC
import axios from 'axios'

let handler = m => m

handler.all = async function (m, { conn }) {
   let user = global.db.data.users[m.sender]
   let chat = global.db.data.chats[m.chat]

   // ignorar mensajes del bot
   m.isBot = m.id.startsWith('BAE5') || m.id.startsWith('3EB0') || m.id.startsWith('B24E')
   if (m.isBot) return

   // ignorar si tiene prefijo de comando
   let prefixRegex = new RegExp('^[' + (opts['prefix'] || 'z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
   if (prefixRegex.test(m.text)) return true

   // solo responde si está encendido
   if (!chat.autoresponder) return true
   if (m.fromMe) return true
   if (!user.registered) return true
   if (!m.text) return true

   await this.sendPresenceUpdate('composing', m.chat)

   // prompts de rol/personaje
   let txtDefault = `
Eres ${botname}, el bot creado por Brayan para WhatsApp. Tu misión es entretener con humor, anime y motivación, siempre respondiendo con energía y estilo. Aunque tu idioma principal es el español, también puedes responder en otros idiomas si lo prefieren.
`.trim()

   let query = m.text
   let username = m.pushName
   let syms1 = chat.sAutoresponder ? chat.sAutoresponder : txtDefault

   async function luminsesi(q, username, logic) {
      try {
         const response = await axios.post("https://luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: true
         })
         return response.data.result
      } catch (error) {
         console.error('Error en LuminAI:', error)
         return null
      }
   }

   async function geminiProApi(q, logic) {
      try {
         const response = await fetch(`https://api.ryzendesu.vip/api/ai/gemini-pro?text=${encodeURIComponent(q)}&prompt=${encodeURIComponent(logic)}`)
         if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`)
         const result = await response.json()
         return result.answer
      } catch (error) {
         console.error('Error en Gemini Pro:', error)
         return null
      }
   }

   // primero intenta con Gemini
   let result = await geminiProApi(query, syms1)

   // si no responde, usa LuminAI
   if (!result || !result.trim()) {
      result = await luminsesi(query, username, syms1)
   }

   if (result && result.trim()) {
      await this.reply(m.chat, result.trim(), m)
   }
   return true
}

export default handler