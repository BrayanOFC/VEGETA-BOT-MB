import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
  m.react('👑');
  const numCreador = '5216641784469';
  const ownerJid = numCreador + '@s.whatsapp.net';

  const name = await conn.getName(ownerJid) || 'BrayanOFC';
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'estoy disponible para responder a tus preguntas';
  const empresa = 'BrayanOFC - Servicios Tecnológicos';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD
  `.trim();

  // 1. Envía la imagen primero
  await conn.sendMessage(m.chat, {
    image: { url: 'https://qu.ax/gSWtg.jpg' },
    caption: `👑 *${name}* - CEO & Fundador de ${empresa}`
  }, { quoted: m });

  // 2. Luego envía el contacto vCard
  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      }
    },
    { quoted: m }
  );
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;