} catch (e) {
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
}}

global.dfail = (type, m, usedPrefix, command, conn) => {

/*let edadaleatoria = ['10', '28', '20', '40', '18', '21', '15', '11', '9', '17', '25'].getRandom()
let user2 = m.pushName || 'Anónimo'
let verifyaleatorio = ['registrar', 'reg', 'verificar', 'verify', 'register'].getRandom()*/

const msg = {
rowner: '🐉El comando *${comando}* solo puede ser usado por los creadores del bot SAIYAJIN☁️.',
owner: '🐉El comando *${comando}* solo puede ser usado por los desarrolladores del bot SAIYAJIN☁️.',
mods: '🐉El comando *${comando}* solo puede ser usado por los moderadores del bot SAIYAJIN☁️.',
premium: '🐉El comando *${comando}* solo puede ser usado por los usuarios premium SAIYAJIN☁️.',
group: '🐉El comando *${comando}* solo puede ser usado en grupos SAIYAJIN☁️.',
private: '🐉El comando *${comando}* solo puede ser usado al chat privado del bot SAIYAJIN☁️.',
admin: '🐉El comando *${comando}* solo puede ser usado por los administradores del grupo SAIYAJIN☁️.',
botAdmin: '🐉Para ejecutar el comando *${comando}* debo ser administrador del grupo SAIYAJIN☁️.',
//unreg: '🐉pene de BrayanOFC☁️',
restrict: '🐉Esta caracteristica está desactivada SAIYAJIN☁️.'
}[type];
if (msg) return m.reply(msg).then(_ => m.react('✖️'))}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.magenta("Se actualizo 'handler.js'"))

if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
for (const userr of users) {
userr.subreloadHandler(false)
}}})