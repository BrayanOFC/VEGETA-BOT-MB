let handler = async (m, { conn, usedPrefix }) => {
  let groupsCommands = Object.values(global.plugins)
    .filter(p => p?.tags?.includes('grupos') && !p.disabled)
    .map(p => {
      let cmd = p.command instanceof RegExp ? p.command.source : Array.isArray(p.command) ? p.command.join(', ') : p.command;
      return `• ${usedPrefix}${cmd}`;
    })
    .join('\n');

  let menu = `
┏━〔 Menú Grupos 〕━
${groupsCommands}
┗━━━━━━━━━━━━━
`;

  m.reply(menu);
};

handler.help = ['menugrupos'];
handler.tags = ['main'];
handler.command = /^menugrupos$/i;

export default handler;