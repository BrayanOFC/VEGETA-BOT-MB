// créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  try {
    m.react('👑');

    const name = 'BrayanOFC 👻';
    const empresa = 'BrayanOFC - Servicios Tecnológicos';
    const numero = '+52 664 178 4469';
    const link = 'https://wa.me/526641784469';
    const imagen = 'https://raw.githubusercontent.com/BrayanOFC/Adiciones/main/Contenido%2F2025090166.jpg';

    const caption = `
╭━━━〔 👑 *OWNER INFO* 👑 〕━━⬣
┃ 👤 *Nombre:* ${name}
┃ 🏢 *Empresa:* ${empresa}
┃ 📱 *Número:* ${numero}
┃ 🔗 *Contacto:* ${link}
╰━━━━━━━━━━━━━━━━━━━━━━⬣
    `.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imagen },
      caption,
      contextInfo: {
        externalAdReply: {
          title: '👑 BrayanOFC 👑',
          body: 'Servicios Tecnológicos',
          thumbnailUrl: imagen,
          sourceUrl: link,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al mostrar la info del owner.');
  }
}

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;