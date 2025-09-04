import axios from 'axios';
import fetch from 'node-fetch';

const userRequests = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*🤔 ¿Qué está buscando?* Ejemplo: ${usedPrefix + command} ozuna`);
  if (userRequests[m.sender]) return await conn.reply(m.chat, `⚠️ Hey @${m.sender.split('@')[0]}, ya estás descargando una canción 🙄\nEspera a que termine tu descarga. 👆`, m);
  
  userRequests[m.sender] = true;
  m.react('⌛');

  try {
    const results = await spotifyxv(text);
    if (!results.length) return m.reply('⚠️ No se encontraron resultados para esa búsqueda.');

    const track = results[0];
    const spotifyMessage = `*• Título:* ${track.name}
*• Artista:* ${track.artista.join(', ')}
*• Álbum:* ${track.album}
*• Duración:* ${track.duracion}

> 🚀 *Enviando canción, espere un momento...*`;

    await conn.sendMessage(m.chat, {
      text: spotifyMessage,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        externalAdReply: {
          showAdAttribution: true,
          renderLargerThumbnail: true,
          title: track.name,
          body: "Enviando canción 🚀",
          mediaType: 1,
          thumbnailUrl: track.imagen,
          mediaUrl: track.url,
          sourceUrl: track.url
        }
      }
    }, { quoted: m });

    // Intenta descargar con diferentes APIs
    const downloadAttempts = [
      async () => {
        const res = await fetch(`https://api.siputzx.my.id/api/d/spotify?url=${track.url}`);
        const data = await res.json();
        return data?.data?.download || null;
      },
      async () => {
        const res = await fetch(`https://tu-api.com/download/spotifydl?url=${track.url}`);
        const data = await res.json();
        return data?.data?.url || null;
      }
    ];

    let downloadUrl = null;
    for (const attempt of downloadAttempts) {
      try {
        downloadUrl = await attempt();
        if (downloadUrl) break;
      } catch (err) {
        console.error(`Error en intento: ${err.message}`);
      }
    }

    if (!downloadUrl) throw new Error('No se pudo descargar la canción desde ninguna API');

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      fileName: `${track.name}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

    m.react('✅');
  } catch (error) {
    m.reply(`⚠️ Ocurrió un error\n\n> ${error.message}`);
    console.error(error);
    m.react('❌');
  } finally {
    delete userRequests[m.sender];
  }
};

handler.help = ['spotify'];
handler.tags = ['downloader'];
handler.command = /^(spotify|music)$/i;
handler.register = true;
handler.limit = 1;

export default handler;


async function spotifyxv(query) {
  let token = await tokens();
  try {
    let response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const tracks = response.data.tracks.items;
    return tracks.map(track => ({
      name: track.name,
      artista: track.artists.map(artist => artist.name),
      album: track.album.name,
      duracion: timestamp(track.duration_ms),
      url: track.external_urls.spotify,
      imagen: track.album.images.length ? track.album.images[0].url : ''
    }));
  } catch (error) {
    console.error(`Error en spotifyxv: ${error}`);
    return [];
  }
}

async function tokens() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from('TU_CLIENT_ID:TU_CLIENT_SECRET').toString('base64')
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error(`Error en tokens: ${error}`);
    throw new Error('No se pudo obtener el token de acceso');
  }
}

function timestamp(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}