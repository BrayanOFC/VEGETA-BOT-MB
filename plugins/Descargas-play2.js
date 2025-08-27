import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('✨ Ingresa un texto para buscar en YouTube.');

  try {
    // Buscar video usando la API de Delirius
    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${encodeURIComponent(text)}`;
    const searchResp = await fetch(searchApi);
    const searchData = await searchResp.json();

    if (!searchData?.data || searchData.data.length === 0)
      return m.reply(`⚠️ No se encontraron resultados para "${text}".`);

    const video = searchData.data[0];

    const videoDetails = `
🎵 *Título:* ${video.title}
📺 *Canal:* ${video.author.name}
⏱️ *Duración:* ${video.duration}
👀 *Vistas:* ${video.views}
📅 *Publicado:* ${video.publishedAt}
🌐 *Enlace:* ${video.url}
    `;
    await conn.sendMessage(m.chat, { image: { url: video.image }, caption: videoDetails.trim() }, { quoted: m });

    // Descargar usando API de MatheusIshiyama (sin apikey requerida)
    const downloadApi = `https://youtube-download-api.matheusishiyama.repl.co/mp4/?url=${encodeURIComponent(video.url)}`;
    const downloadResp = await fetch(downloadApi);

    if (!downloadResp.ok)
      return m.reply('❌ La API de respaldo falló al obtener el video.');

    const buffer = await downloadResp.buffer();
    await conn.sendMessage(m.chat, { document: buffer, mimetype: 'video/mp4', filename: `${video.title}.mp4` }, { quoted: m });

    await m.react('✅');

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar la solicitud:\n${error.message}`);
  }
};

handler.command = ['play2'];
handler.help = ['play2 <texto>'];
handler.tags = ['media'];

export default handler;