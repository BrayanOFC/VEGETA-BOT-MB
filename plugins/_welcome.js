// creado y editado por BrayanOFC
let handler = async (m, { conn }) => {}

handler.before = async function (m, { conn }) {
   if (!m.messageStubType) return !1
   let who = m.messageStubParameters[0]
   let name = await conn.getName(who)

   // ─── BIENVENIDA ───
   if (m.messageStubType == 27) {
      try {
         let groupMetadata = await conn.groupMetadata(m.chat)
         let desc = groupMetadata.desc || "🚀 Este grupo no tiene reglas Se Feliz Saiyajin👾."
         
         let text = `👊🏻🔥 ¡Escucha insecto/a @${who.split('@')[0]}!

Has entrado al campo de batalla del grupo. Aquí no hay lugar para los débiles.  

📜 **Reglas del Grupo**:
${desc}

🚀 El que rompa las reglas… conocerá mi furia Saiyajin. 🚀`

         conn.sendMessage(m.chat, { text, mentions: [who] }, { quoted: m })
      } catch (e) {
         console.log(e)
      }
   }

   // ─── DESPEDIDA ───
   if (m.messageStubType == 28) {
      let text = `💥 El guerrero @${who.split('@')[0]} ha abandonado el campo de batalla.  

No todos soportan el poder de este grupo… ¡patético! 👊🏻🔥`
      conn.sendMessage(m.chat, { text, mentions: [who] }, { quoted: m })
   }
}

export default handler