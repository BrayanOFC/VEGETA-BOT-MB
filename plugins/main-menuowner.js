// creado y editado por BrayanOFC 👻
let handler = async (m, { conn, usedPrefix }) => {
let menu = `
╭━━━〔 👑 𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹 👑 〕━━━╮
┃
┃ ⚙️ *Comandos disponibles para el Owner*
┃
┃ 🔹 ${usedPrefix}autoadmin
┃ 🔹 ${usedPrefix}banuser <@user>
┃ 🔹 ${usedPrefix}unbanuser <@user>
┃ 🔹 ${usedPrefix}dsowner
┃ 🔹 ${usedPrefix}
┃ 🔹 ${usedPrefix}$ <código>
┃ 🔹 ${usedPrefix}join <link de grupo>
┃ 🔹 ${usedPrefix}resetprefix
┃ 🔹 ${usedPrefix}restart
┃ 🔹 ${usedPrefix}saveplugin <código>
┃ 🔹 ${usedPrefix}setprefix <nuevo prefijo>
┃ 🔹 ${usedPrefix}update
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`;

await conn.sendMessage(m.chat, { text: menu, 
contextInfo: {
  forwardingScore: 1,
  isForwarded: true,
  externalAdReply: {
    title: '👑 Menú Owner',
    body: 'Comandos solo para el creador',
    thumbnailUrl: 'https://i.ibb.co/mcXrs8T/owner.jpg', // cámbiala por tu logo/foto
    sourceUrl: 'https://github.com/BrayanOFC',
    mediaType: 1,
    renderLargerThumbnail: true
  }
}}, { quoted: m });
};

handler.help = ['menuowner'];
handler.tags = ['menu'];
handler.command = /^menuowner$/i;
handler.rowner = true; // 🔒 Solo owner

export default handler;