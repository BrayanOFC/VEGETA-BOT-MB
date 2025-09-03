// créditos github.com/BrayanOFC no quitar creditos
import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('🎵 Ingresa el nombre de la canción y artista\n\nEjemplo: .letra Linkin Park Numb');

  try {
    let api = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(text.split(" ")[0])}/${encodeURIComponent(text.split(" ").slice(1).join(" "))}`);
    let res = await api.json();

    if (!res || !res.lyrics) {
      return m.reply('❌ No encontré la letra de esa canción');
    }

    let letra = res.lyrics;
    let partes = letra.match(/[\s\S]{1,3000}/g) || []; 

    for (let parte of partes) {
      await conn.reply(m.chat, parte, m);
    }

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al buscar la letra');
  }
};

handler.help = ['letra <artista> <canción>'];
handler.tags = ['buscador', 'musica'];
handler.command = /^letra$/i;

export default handler;