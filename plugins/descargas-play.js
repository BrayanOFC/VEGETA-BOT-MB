import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠ Formato no soportado, elige uno de la lista disponible.");
    }

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data?.success) {
        const { id, title, info } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, title, image: info.image, downloadUrl };
      } else {
        throw new Error("⛔ No se pudo obtener los detalles del video.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, "💥 *VEGETA BOT* | ɪᴍɢʀᴇsᴀ ᴇʟ ɴᴏᴍʙʀᴇ ᴅᴇ ʟᴀ ᴄᴀɴᴄɪᴏɴ ǫᴜᴇ ᴅᴇsᴇᴀs ʙᴜsᴄᴀʀ...", m, rcanal);
    }

    const search = await yts(text);
    if (!search.all.length) {
      return m.reply("⚠ No se encontraron resultados para tu búsqueda.");
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const thumb = (await conn.getFile(thumbnail))?.data;

    const infoMessage = ` 💨 \`𝐕𝐄𝐆𝐄𝐓𝐀-𝐁𝐎𝐓 - 𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸𝕊\`\n\n*✦ Título:* ${title}\n> ━━━━━━━━━━━━━━━━━━━━━\n*✰ 𝔻𝕌ℝ𝔸ℂ𝕀𝕆ℕ:* ${timestamp}\n> ━━━━━━━━━━━━━━━━━━━━━\n*✰ 𝕍𝕀𝕊𝕋𝔸𝕊:* ${vistas}\n> ━━━━━━━━━━━━━━━━━━━━━\n*✰ ℂ𝔸ℕ𝔸𝕃:* ${videoInfo.author.name || "Desconocido"}\n> ━━━━━━━━━━━━━━━━━━━━━\n*✰ ℙ𝕌𝔹𝕃𝕀ℂ𝔸𝔻𝕆:* ${ago}\n> ━━━━━━━━━━━━━━━━━━━━━\n*∞ 𝔼ℕ𝕃𝔸ℂ𝔼:* ${url}`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: "Vegeta-Bot MB 🤖",
          body: "(1) ᴅᴇʟ ᴍᴇᴊᴏʀ ʙᴏᴛ 𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    };

    await conn.reply(m.chat, infoMessage, fkontak, JT);

    if (["play", "yta", "ytmp3"].includes(command)) {
      const api = await ddownr.download(url, "mp3");
      await conn.sendMessage(m.chat, { audio: { url: api.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: fkontak });

    } else if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (let source of sources) {
        try {
          const res = await fetch(source);
          const { data, result, downloads } = await res.json();
          let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;

          if (downloadUrl) {
            success = true;
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: "video/mp4",
              caption: "• ᴀǫᴜɪ ᴛɪᴇɴᴇs ᴛᴜ ᴠɪᴅᴇᴏ ᴅᴇsᴄᴀʀɢᴀᴅᴏ ᴘᴏᴛ *𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱* ⚔",
              thumbnail: thumb
            }, { quoted: fkontak });
            break;
          }
        } catch (e) {
          console.error(`⚠ Error con la fuente ${source}:`, e.message);
        }
      }

      if (!success) {
        return m.reply("⛔ *Error:* No se encontró un enlace de descarga válido.");
      }
    } else {
      throw "❌ Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`⚠ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];
handler.coin = 5;

export default handler;

function formatViews(views) {
  if (typeof views !== "number") return "Desconocido";
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : views.toString();
}