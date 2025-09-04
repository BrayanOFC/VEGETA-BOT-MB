
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

  m.reply(menu);
};

handler.help = ['menuowner'];
handler.tags = ['main'];
handler.command = /^menuowner$/i;

export default handler;