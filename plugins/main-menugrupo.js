let handler = async (m, { conn, usedPrefix }) => {
  
let gruposHelp = Object.values(global.plugins)
    .filter(p => p?.tags?.includes('grupo') && !p.disabled)
    .map(p => {
      // Toma solo el primer help si hay varios
      let helpText = Array.isArray(p.help) ? p.help[0] : p.help;
      return `• ${helpText}`;
    })
    .join('\n');

  let menu = `
┏━〔 Menú Grupos 〕━
${gruposHelp}
┗━━━━━━━━━━━━━
`;

  m.reply(menu);
};

handler.help = ['menugrupos'];
handler.tags = ['main'];
handler.command = /^menugrupos$/i;

export default handler;