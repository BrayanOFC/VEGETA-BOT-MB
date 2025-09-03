import { readFile } from 'fs/promises';
import ws from 'ws';

const handler = async (m, { conn, usedPrefix }) => {
  let _muptime;
  const totalreg = Object.keys(global.db.data.users).length;

  const data = JSON.parse(await readFile('./src/database/db.json', 'utf-8'));
  const imagenes = data.vegeta?.imagenes;
  const pp = imagenes?.length
    ? imagenes[Math.floor(Math.random() * imagenes.length)]
    : 'https://i.imgur.com/XTzfa1T.jpg';

  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }

  const muptime = clockString(_muptime);
  const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)])];
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const totalUsers = users.length;
  const speed = process.memoryUsage().heapUsed / 1024 / 1024;

  let Vegeta = `𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑪𝑰𝑶𝑵 - ${botname}\n`;
  Vegeta += `👑 *◜ᴄʀᴇᴀᴅᴏʀ◞* ⇢ BrayanOFC👑\n`;
  Vegeta += `🎯 *◜ᴘʀᴇғɪᴊᴏ◞* ⇢ [ ${usedPrefix} ]\n`;
  Vegeta += `🏷 *◜ᴠᴇʀsɪᴏɴ◞* ⇢ ${vs}\n`;
  Vegeta += `🔐 *◜ᴄʜᴀᴛs ᴘʀɪᴠᴀᴅᴏ◞* ⇢ ${chats.length - groupsIn.length}\n`;
  Vegeta += `📌 *◜ᴛᴏᴛᴀʟ ᴅᴇ ᴄʜᴀᴛs◞* ⇢ ${chats.length}\n`;
  Vegeta += `👥️ *◜ᴜsᴜᴀʀɪᴏs◞* ⇢ ${totalreg}\n`;
  Vegeta += `📍 *◜ɢʀᴜᴘᴏs◞* ⇢ ${groupsIn.length}\n`;
  Vegeta += `🧭 *◜ᴀᴄᴛɪᴠɪᴅᴀᴅ◞* ⇢ ${muptime}\n`;
  Vegeta += `🚀 *◜ᴠᴇʟᴏᴄɪᴅᴀᴅ◞* ⇢ ${speed.toFixed(2)} MB\n`;
  Vegeta += `🌟 *◜sᴜʙ-ʙᴏᴛs ᴀᴄᴛɪᴠᴏs◞* ⇢ ${totalUsers || '0'}`;

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: Vegeta
  }, { quoted: m });
};

handler.help = ['estado'];
handler.tags = ['info'];
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}