// créditos github.com/BrayanOFC no quitar creditos
async function handler(m, { conn }) {
  try {
    await m.react('👑');

    // Primer creador
    const name1 = 'BrayanOFC 👻';
    const empresa1 = '✨ BrayanOFC - Servicios Tecnológicos ✨';
    const numero1 = '+52 664 178 4469';
    const dash1 = 'https://dash.skyultraplus.com';
    const github1 = 'https://github.com/BrayanOFC';
    const imagen1 = 'https://raw.githubusercontent.com/BrayanOFC/Adiciones/main/Contenido%2F2025090166.jpg';

    // Segundo creador
    const name2 = '👑 The-Carlos';
    const empresa2 = '⚡ Servicios Tecnológicos ⚡';
    const numero2 = '+52 55 4487 6071';
    const github2 = 'https://github.com/Thecarlos19';

    const caption = `
┏━━━━━━━━━━━━━━━━━━━┓
┃     👑 *CREADOR INFO* 👑      
┗━━━━━━━━━━━━━━━━━━━┛

🌟 *Nombre:* ${name1}
🏢 *Empresa:* ${empresa1}
📱 *Número:* ${numero1}
🔗 *Dash Sky:* ${dash1}
💻 *GitHub:* ${github1}

━━━━━━━━━━━━━━━━━━━━━━━
👑 *Segundo Creador* 👑
━━━━━━━━━━━━━━━━━━━━━━━
🌟 *Nombre:* ${name2}
🏢 *Empresa:* ${empresa2}
📱 *Número:* ${numero2}
💻 *GitHub:* ${github2}

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
          thumbnailUrl: imagen1,
          sourceUrl: dash1,
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

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;