// créditos github.com/BrayanOFC no quitar creditos
import { readFile } from 'fs/promises';
import ws from 'ws';

const handler = async (m, { conn, usedPrefix }) => {
  let _muptime;

  const totalreg = Object.keys(global.db?.data?.users || {}).length;

  let data = {};
  try {
    data = JSON.parse(await readFile('./src/database/db.json', 'utf-8'));
  } catch (e) {
    console.log('⚠️ No se pudo leer db.json, usando valores por defecto');
  }

  const imagenes = data.vegeta?.imagenes || [];
  const pp = imagenes.length
    ? imagenes[Math.floor(Math.random() * imagenes.length)]
    : 'https://i.imgur.com/XTzfa1T.jpg';

  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(() => resolve(0), 1000);
    }) * 1000;
  } else {
    _muptime = process.uptime() * 1000;
  }
  const muptime = clockString(_muptime);

  const users = [...new Set([...((global.conns || []).filter((c) =>
    c.user && c.ws?.socket && c.ws.socket.readyState !== ws.CLOSED
  ))])];

  const chats = Object.entries(conn.chats || {}).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));

  const botname = global.botname || "VEGETA-BOT";
  const vs = global.vs || "1.0.0";
  const totalUsers = users.length;
  const speed = process.memoryUsage().heapUsed / 1024 / 1024;

  let Vegeta = `𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑪𝑰𝑶𝑵 - ${botname}\n\n`;
  Vegeta += `👑 *Creador:* BrayanOFC👑\n`;
  Vegeta += `🎯 *Prefijo:* [ ${usedPrefix} ]\n`;
  Vegeta += `🏷 *Versión:* ${vs}\n`;
  Vegeta += `🔐 *Chats Privados:* ${chats.length - groupsIn.length}\n`;
  Vegeta += `📌 *Total de Chats:* ${chats.length}\n`;
  Vegeta += `👥 *Usuarios:* ${totalreg}\n`;
  Vegeta += `📍 *Grupos:* ${groupsIn.length}\n`;
  Vegeta += `🧭 *Actividad:* ${muptime}\n`;
  Vegeta += `🚀 *Velocidad:* ${speed.toFixed(2)} MB\n`;
  Vegeta += `🌟 *Sub-bots activos:* ${totalUsers || '0'}`;

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: Vegeta
  }, { quoted: m });
};

handler.help = ['estado'];
handler.tags = ['info'];
handler.command = /^estado|status|estate|state|stado|stats$/i; // regex
handler.register = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}