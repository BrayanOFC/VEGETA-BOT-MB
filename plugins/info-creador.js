//créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  m.react('👑');

  const name = 'BrᴀʏᴀɴOFC 👻';
  const empresa = 'BrayanOFC - Servicios Tecnológicos';
  const link = 'wa.me/526641784469';
  const imagen = 'https://qu.ax/gSWtg.jpg';

  const caption = `
╭━〔 👑 *OWNER INFO* 👑 〕━⬣
┃ 👤 *Nombre:* ${name}
┃ 🏢 *Empresa:* ${empresa}
┃ 🔗 *Contacto:* 
┃    ${link}
╰━━━━━━━━━━━━━━━━━━⬣
  `.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imagen },
    caption,
  }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;