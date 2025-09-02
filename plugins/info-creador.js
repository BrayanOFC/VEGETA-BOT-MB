//créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  m.react('👑');

  const name = 'BrayanOFC 👻';
  const empresa = 'BrayanOFC - Servicios Tecnológicos';
  const link = 'wa.me/526641784469';
  const imagen = '%2F2025090166.jpg';

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
