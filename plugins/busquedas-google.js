// créditos github.com/BrayanOFC no quitar creditos

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🐉 Ingresa lo que quieras buscar en Google\n\nEjemplo: .google WhatsApp Bot');

  try {
    let url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    let msg = `🔎 *Búsqueda en Google:*\n\n📌 *${text}*\n\n😂 Aquí tienes el enlace:\n${url}`;

    await conn.reply(m.chat, msg, m);
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al generar el link de búsqueda');
  }
};

handler.help = ['google <texto>'];
handler.tags = ['buscador'];
handler.command = /^google$/i;

export default handler;