import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`🐉 El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *.on nsfw*`);
  }

  if (!text) throw `☁️ Por favor, ingresa el nombre de algún hentai para buscar.`;

  const searchResults = await searchHentai(text);
  let teks = searchResults.result.map((v, i) => `
${i + 1}. *_${v.title}_*
↳ 👀 *_Vistas:_* ${v.views}
↳ 🔗 *_Link:_* ${v.url}`).join('\n\n');

  let randomThumbnail;
  if (searchResults.result.length > 0) {
    const randomIndex = Math.floor(Math.random() * searchResults.result.length);
    randomThumbnail = searchResults.result[randomIndex].thumbnail;
  } else {
    randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png';
    teks = `❌ No se encontraron resultados.`;
  }

  conn.sendFile(m.chat, randomThumbnail, 'hentai.jpg', teks, m);
};

handler.help = ['searchhentai','hentaisearch'];
handler.tags = ['nsfw'];
handler.command = ['searchhentai', 'hentaisearch'];

export default handler;

async function searchHentai(search) {
  try {
    const { data } = await axios.get('https://hentai.tv/?s=' + search);
    const result = { coder: 'rem-comp', result: [], warning: 'It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp' };

    // Extraer cada card
    const regex = /<div class="crsl-slde">([\s\S]*?)<\/div>/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const block = match[1];

      const thumbnail = /<img[^>]+src="([^"]+)"/.exec(block)?.[1] || '';
      const title = /<a[^>]*>(.*?)<\/a>/.exec(block)?.[1]?.trim() || '';
      const views = /<p[^>]*>(.*?)<\/p>/.exec(block)?.[1]?.trim() || '';
      const url = /<a[^>]+href="([^"]+)"/.exec(block)?.[1] || '';

      if (title && url) {
        result.result.push({ thumbnail, title, views, url });
      }
    }
    return result;
  } catch (e) {
    console.error(e);
    return { coder: 'rem-comp', result: [], warning: 'Error en la búsqueda' };
  }
}