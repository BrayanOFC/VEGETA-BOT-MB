// creado y editado por BrayanOFC 👻
/*let handler = async (m, { conn, usedPrefix }) => {
let menu = `
╭━━━〔 👑 𝑴𝑬𝑵𝑼 𝑶𝑾𝑵𝑬𝑹 👑 〕━━━╮
┃
┃ ⚙️ *Comandos disponibles para el Owner*
┃
┃ 🔹 ${usedPrefix}autoadmin
┃ 🔹 ${usedPrefix}banuser <@user>
┃ 🔹 ${usedPrefix}unbanuser <@user>
┃ 🔹 ${usedPrefix}dsowner
┃ 🔹 ${usedPrefix}=>
┃ 🔹 ${usedPrefix}$ 
┃ 🔹 ${usedPrefix}join <link de grupo>
┃ 🔹 ${usedPrefix}resetprefix
┃ 🔹 ${usedPrefix}restart
┃ 🔹 ${usedPrefix}saveplugin <código>
┃ 🔹 ${usedPrefix}setprefix <nuevo prefijo>
┃ 🔹 ${usedPrefix}update
┃ 🔹 ${usedPrefix}cheat
┃ 🔹 ${usedPrefix}cleartmp
┃ 🔹 ${usedPrefix}promotebot
┃ 🔹 ${usedPrefix}mainbot
┃
╰━━━━━━━━━━━━━━━━━━━━━━━╯
🔥 *© ⍴᥆ᥕᥱrᥱძ ᑲᥡ  ➳𝐁𝐫𝐚𝐲𝐚𝐧𝐎𝐅𝐂ღ* 🔥
`.trim()

await m.react('☁️')

await conn.sendMessage(m.chat, { text: menu, 
contextInfo: {
  forwardingScore: 1,
  isForwarded: true,
  externalAdReply: {
    title: '👑 Menú Owner',
    body: 'Comandos solo para el creador',
    thumbnailUrl: 'https://i.ibb.co/mcXrs8T/owner.jpg',
    sourceUrl: 'https://github.com/BrayanOFC',
    mediaType: 1,
    renderLargerThumbnail: true
  }
}}, { quoted: m });
};

handler.help = ['menuowner'];
handler.tags = ['main'];
handler.command = /^menuowner$/i;
handler.rowner = true; 
export default handler;*/


let handler = async (m, { conn, usedPrefix }) => {
  let groupsCommands = Object.values(global.plugins)
    .filter(p => p?.tags?.includes('owner') && !p.disabled)
    .map(p => {
      let cmd = p.command instanceof RegExp ? p.command.source : Array.isArray(p.command) ? p.command.join(', ') : p.command;
      return `• ${usedPrefix}${cmd}`;
    })
    .join('\n');

  let menu = `
┏━〔 Menú Owner 〕━
${ownerCommands}
┗━━━━━━━━━━━━━
`;

  m.reply(menu);
};

handler.help = ['menuowner'];
handler.tags = ['main'];
handler.command = /^menuowner$/i;

export default handler;