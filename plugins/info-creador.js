// Créditos github.com/BrayanOFC - No quitar créditos
async function handler(m, { conn }) {
  await m.react('👑');

  const name = 'BrayanOFC 👻';
  const empresa = 'BrayanOFC - Servicios Tecnológicos';
  const link = 'https://wa.me/526641784469';
  const imagen = 'https://files.catbox.moe/j2xvue.jpg';

  const caption = `
╭━━━〔 👑 *OWNER INFO* 👑 〕━━━⬣
┃ 👤 *Nombre:* ${name}
┃ 🏢 *Empresa:* ${empresa}
┃ 🔗 *Contacto:* ${link}
┃ ⚡ *GitHub:* github.com/BrayanOFC
╰━━━━━━━━━━━━━━━━━━━━⬣
`.trim();

  const buttons = [
    { 
      buttonId: link, 
      buttonText: { displayText: "📞 Contactar por WhatsApp" }, 
      type: 1 
    }
  ];

  await conn.sendMessage(m.chat, {
    image: { url: imagen },
    caption,
    buttons,
    footer: "🔥 By BrayanOFC 🔥",
    viewOnce: true,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363394965381607@newsletter',
        newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱*:·',
        serverMessageId: 777
      }
    }
  }, { quoted: m });
}

handler.help = ['owner', 'creator', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;