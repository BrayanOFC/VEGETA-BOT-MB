// creado por BrayanOFC no quites creditos
let handler = async (m, { conn }) => {
   m.reply('🤖 El *autoresponder* está activo en este chat.')
}

handler.help = ['autoresponder']
handler.tags = ['grupo']
handler.command = /^autoresponder$/i

export default handler