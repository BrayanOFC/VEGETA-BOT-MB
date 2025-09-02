// créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  try {
    await m.react('👑');

    const name = 'BrayanOFC 👻';
    const empresa = '✨ BrayanOFC - Servicios Tecnológicos ✨';
    const numero = '+52 664 178 4469';
    const link = 'https://wa.me/526641784469';
    const imagen = 'https://raw.githubusercontent.com/BrayanOFC/Adiciones/main/Contenido%2F2025090166.jpg';

    const caption = `
┏━━━━━━━━━━━━━━━━━━━┓
┃      👑 *OWNER INFO* 👑      
┗━━━━━━━━━━━━━━━━━━━┛

🌟 *Nombre:* ${name}
🏢 *Empresa:* ${empresa}
📱 *Número:* ${numero}
🔗 *WhatsApp:* ${link}
💻 *GitHub:* ${github}

━━━━━━━━━━━━━━━━━━━━━━━
⚡ *Atención 24/7 • Calidad • Confianza* ⚡
━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const buttons = [
      { buttonId: 'contacto', buttonText: { displayText: '📲 Contactar al Owner' }, type: 1 },
      { buttonId: 'github', buttonText: { displayText: '💻 GitHub Oficial' }, type: 1 }
    ];

    const buttonMessage = {
      image: { url: imagen },
      caption,
      footer: '👑 BrayanOFC 👑',
      buttons,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: '👑 BrayanOFC 👑',
          body: 'Servicios Tecnológicos de Alto Nivel 🚀',
          thumbnailUrl: imagen,
          sourceUrl: link,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('❌ Ocurrió un error al mostrar la info del owner.');
  }
}

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;