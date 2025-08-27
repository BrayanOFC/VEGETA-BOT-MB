import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `🐉 Ingresa un texto para buscar en YouTube.\n> *Ejemplo:* ${usedPrefix + command} Shakira`, m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));
        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];
        let thumbnail = await (await fetch(video.miniatura)).buffer();

        let messageText = `*Youtube - Download*\n\n`;
        messageText += `${video.titulo}\n\n`;
        messageText += `*⌛ Duración:* ${video.duracion || 'No disponible'}\n`;
        messageText += `*👤 Autor:* ${video.canal || 'Desconocido'}\n`;
        messageText += `*📆 Publicado:* ${convertTimeToSpanish(video.publicado)}\n`;
        messageText += `*🖇️ Url:* ${video.url}\n`;

        await conn.sendMessage(m.chat, { 
            image: thumbnail, 
            caption: messageText, 
            footer: '𝖯𑄜𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖲𝗁⍺𝖽ᦅ𝗐′𝗌 𝖢𝗅𝗎𝖻' 
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al buscar el video.`*', m);
    }
};

handler.help = ['play'];
handler.tags = ['descargas'];
handler.command = ['play'];
export default handler;

async function searchVideos(query) {
    try {
        const res = await yts(query);
        return res.videos.slice(0, 10).map(video => ({
            titulo: video.title,
            url: video.url,
            miniatura: video.thumbnail,
            canal: video.author.name,
            publicado: video.timestamp || 'No disponible',
            vistas: video.views || 'No disponible',
            duracion: video.duration.timestamp || 'No disponible'
        }));
    } catch (error) {
        console.error('Error en yt-search:', error.message);
        return [];
    }
}

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/g, 'año').replace(/years/g, 'años')
        .replace(/month/g, 'mes').replace(/months/g, 'meses')
        .replace(/day/g, 'día').replace(/days/g, 'días')
        .replace(/hour/g, 'hora').replace(/hours/g, 'horas')
        .replace(/minute/g, 'minuto').replace(/minutes/g, 'minutos');
}