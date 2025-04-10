let handler = async (m, { conn, args, command }) => {
  const defaultImage = 'https://files.catbox.moe/gcakj4.jpg';
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => defaultImage);

  let isClose = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
  }[(args[0] || '')];

  if (isClose === undefined)
    return conn.reply(m.chat, `🍬 *Elija una opción para configurar el grupo*\n\nEjemplo:\n*✰ #${command} abrir*\n*✰ #${command} cerrar*\n*✰ #${command} close*\n*✰ #${command} open*`, m);

  await conn.groupSettingUpdate(m.chat, isClose);

  if (isClose === 'not_announcement') {
    m.reply(`🍬 *Ya pueden escribir en este grupo.*\n\nImagen: ${pp}`);
  }

  if (isClose === 'announcement') {
    m.reply(`🍭 *Solos los admins pueden escribir en este grupo.*\n\nImagen: ${pp}`);
  }
}

handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['grupo'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
