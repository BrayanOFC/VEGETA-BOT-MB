// créditos github.com/BrayanOFC no quitar creditos
import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🐉 Ingresa lo que quieras buscar en Google\n\nEjemplo: .google W
q son los bots');

  try {
    let api = await fetch(`https://api.safone.me/google?query=${encodeURIComponent(text)}`);
    let res = await api.json();

    if (!res || !res.result || res.result.length === 0) {
      return m.reply('❌ No encontré resultados en Google');
    }

    let results = `🔎 *Resultados de Google para:* ${text}\n\n`;
    for (let i = 0; i < Math.min(5, res.result.length); i++) {
      results += `📌 *${res.result[i].title}*\n🔗 ${res.result[i].link}\n\n`;
    }

    await conn.reply(m.chat, results, m);
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al conectar con la API de Google');
  }
};

handler.help = ['google <texto>'];
handler.tags = ['buscador'];
handler.command = /^google$/i;

export default handler;