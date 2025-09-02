// créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  try {
    await m.react('👑');

    const name = 'BrayanOFC 👻';
    const empresa = '✨ BrayanOFC - Servicios Tecnológicos ✨';
    const numero = '+52 664 178 4469';
    const dash = 'https://dashomega.skyultraplus.com';
    const github = 'https://github.com/BrayanOFC';
    const imagen = 'https://raw.githubusercontent.com/BrayanOFC/Adiciones/main/Contenido%2F2025090166.jpg';

    const caption = `
┏━━━━━━━━━━━━━━━━━━━┓
┃      👑 *OWNER INFO* 👑      
┗━━━━━━━━━━━━━━━━━━━┛

🌟 *Nombre:* ${name}
🏢 *Empresa:* ${empresa}
📱 *Número:* ${numero}
🔗 *Dash Sky:* ${dash}
💻 *GitHub:* ${github}

━━━━━━━━━━━━━━━━━━━━━━━
⚡ *Atención 24/7 • Calidad • Confianza* ⚡
━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    await conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: '👑 BrayanOFC 👑',
          body: 'Servicios Tecnológicos de Alto Nivel 🚀',
          thumbnailUrl: imagen,
          sourceUrl: dash, 
          mediaType: 1,
          renderLargerThumbnail: true
        },
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363394965381607@newsletter', 
          newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 • Update', 
          serverMessageId: 777
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('❌ Ocurrió un error al mostrar la info del creador.');
  }
}

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;