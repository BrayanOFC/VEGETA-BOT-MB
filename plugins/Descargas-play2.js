import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return m.reply(`✨ Ingresa un texto para buscar en YouTube.\n> *Ejemplo:* ${usedPrefix + command} Shakira`);

  try {
    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      return m.reply(`⚠️ No se encontraron resultados para "${text}".`);
    }

    const video = searchData.data[0];
    const videoDetails = `
🎵 *Título:* ${video.title}
📺 *Canal:* ${video.author.name}
⏱️ *Duración:* ${video.duration}
👀 *Vistas:* ${video.views}
📅 *Publicado:* ${video.publishedAt}
🌐 *Enlace:* ${video.url}
`;

    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: videoDetails.trim()
    }, { quoted: m });

    const downloadVideoApi = `https://youtube-download-api.matheusishiyama.repl.co/mp4/?url=${video.url}`;
    const downloadVideoResponse = await fetch(downloadVideoApi);
    const downloadVideoData = await downloadVideoResponse.json();

    if (!downloadVideoData?.url) return m.reply("❌ No se pudo obtener el video.");

    await conn.sendMessage(m.chat, {
      video: { url: downloadVideoData.url },
      caption: `🎬 Aquí tienes tu video: ${video.title}`,
      fileName: `${video.title}.mp4`
    }, { quoted: m });

    const downloadAudioApi = `https://youtube-download-api.matheusishiyama.repl.co/mp3/?url=${video.url}`;
    const downloadAudioResponse = await fetch(downloadAudioApi);
    const downloadAudioData = await downloadAudioResponse.json();

    if (!downloadAudioData?.url) return m.reply("❌ No se pudo obtener el audio.");

    await conn.sendMessage(m.chat, {
      audio: { url: downloadAudioData.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    await m.react("✅");
  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar la solicitud:\n${error.message}`);
  }
};

handler.command = ['play2'];
handler.help = ['play2 <texto>'];
handler.tags = ['descargas];

export default handler;

