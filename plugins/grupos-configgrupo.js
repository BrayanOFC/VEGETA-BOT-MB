let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono) 
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'on': 'not_announcement',
'off': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
return conn.reply(m.chat, `${emoji} *Elija una opción para configurar el grupo*\n\nEjemplo:\n*✰ #${command} on*\n*✰ #${command} off*\n*✰ #${command} close*\n*✰ #${command} open*`, m)
await conn.groupSettingUpdate(m.chat, isClose)

if (isClose === 'not_announcement'){
m.reply(`${emoji} *Ya pueden escribir en este grupo.*`)
}

if (isClose === 'announcement'){
m.reply(`${emoji2} *Solos los admins pueden escribir en este grupo.*`)
}}
handler.help = ['group open / close', 'grupo on / off']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler