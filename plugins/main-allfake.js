import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

global.creador = 'Wa.me/526731010376'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/526731010376'
global.namechannel = '·:*¨♱𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱♱ ¨*:·'
global.namechannel2 = '·:*¨♱𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱♱ ¨*:·'
global.namegrupo = '·:*¨♱𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱♱ ¨*:·'
global.namecomu = '·:*¨♱𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱♱ ¨*:·'
global.listo = '🍬 *Aquí tienes ฅ^•ﻌ•^ฅ*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')

//IDs channel
global.idchannel = '120363394965381607@newsletter'
global.canalIdM = ["120363394965381607@newsletter", "120363394965381607@newsletter"]
global.canalNombreM = ["𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱*:·", "𝚅𝙴𝙶𝙴𝚃𝙰-𝙱𝙾𝚃-𝙼𝙱"]
global.channelRD = await getRandomChannel()

//fechas
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//Emojis determinado de Vegeta Bot
global.emoji = '🍧'
global.emoji2 = '🍬'
global.emoji3 = '🍨'
global.emoji4 = '🍭'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//mensaje en espera
global.wait = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼,...*';
global.waitt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, ...*';
global.waittt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼,...*';
global.waitttt = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, ...*';

//Enlaces
var canal = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'  
let canal2 = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'
var git = 'https://chat.whatsapp.com/FdBottjrmTvIzD1XTc8vyH'
var github = 'https://chat.whatsapp.com/DWVnDWaepEQCn7uzOPxmHq' 
let correo = 'https://chat.whatsapp.com/DWVnDWaepEQCn7uzOPxmHq'

global.redes = [canal, canal2, git, github, correo].getRandom()

//Imagen
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 3: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 4: hour = 'Lɪɴᴅᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🌆'; break; case 5: hour = 'Lɪɴᴅᴀ Mᴀᴅʀᴜɢᴀᴅᴀ 🌆'; break; case 6: hour = 'Lɪɴᴅᴀ Mᴀñᴀɴᴀ 🌅'; break; case 7: hour = 'Lɪɴᴅᴀ Mᴀñᴀɴᴀ 🌅'; break; case 8: hour = 'Lɪɴᴅᴀ Mᴀñᴀɴᴀ 🌅'; break; case 9: hour = 'Lɪɴᴅᴀ Mᴀñᴀɴᴀ 🌅'; break; case 10: hour = 'Lɪɴᴅᴀ Mᴀñᴀɴᴀ 🌅'; break; case 11: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 12: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 13: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 18: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 19: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌞'; break; case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; }
global.saludo = hour;

//tags
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)
global.rdm = readMore

//Fakes
global.fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${nombre}`, 'vcard': ""}}}

// --- CORREGIDO: aquí el objeto ya no tiene error de sintaxis ---
global.fake = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1
    }
  },
  quoted: m
}

global.icono = [ 
  'https://qu.ax/JwlJf.jpg'
].getRandom()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, }, }

}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * canalIdM.length)
  let id = canalIdM[randomIndex]
  let name = canalNombreM[randomIndex]
  return { id, name }
}