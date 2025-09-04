
let handler = async (m, { conn, usedPrefix }) => {
 
  let ownerHelp = Object.values(global.plugins)
    .filter(p => p?.tags?.includes('owner') && !p.disabled)
    .map(p => {
     
      let helpText = Array.isArray(p.help) ? p.help[0] : p.help;
      return `• ${helpText}`;
    })
    .join('\n');

  let menu = `
┏━〔 Menú Owner 〕━
${ownerHelp}
┗━━━━━━━━━━━━━
`;

await m.react('👑')

let imgBuffer = await (await fetch('https://files.catbox.moe/ppm9t3.jpg')).buffer()
    let media = await prepareWAMessageMedia({ image: imgBuffer }, { upload: conn.waUploadToServer })

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          imageMessage: {
            ...media.imageMessage,
            caption: menuText,
            contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363394965381607@newsletter',
                newsletterName: '𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱 • Update',
                serverMessageId: 101
              }
            }
          }
        }
      }
    }, { userJid: m.sender, quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  m.reply(menu);
};

handler.help = ['menuowner'];
handler.tags = ['main'];
handler.command = /^menuowner$/i;

export default handler;