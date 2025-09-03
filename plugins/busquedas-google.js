// créditos github.com/BrayanOFC no quitar creditos
import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🐉 Ingresa lo que quieras buscar en Google\n\nEjemplo: .google quien es VEGETA-BOT-MB');

  try {
    let api = await fetch(`https://api.simsimi.info/v2/?text=${encodeURIComponent(text)}&lc=es`);
    let data = await api.json();

    let results = `🔎 *Resultados de Google para:* ${text}\n\n`;
    if (data.success) {
      results += `✅ ${data.success}`;
    } else {
      results += '❌ No encontré resultados';
    }

    await conn.reply(m.chat, results, m);
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al buscar en Google');
  }
};

handler.help = ['google <texto>'];
handler.tags = ['buscador'];
handler.command = /^google$/i;

export default handler;