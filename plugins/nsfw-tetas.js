let handler = async(m, { conn }) => {

let img = 'https://delirius-apiofc.vercel.app/nsfw/boobs';

let text = '*🫨 TETAS*';

conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m });
m.react('✅');
}
handler.help = ['tetas']
handler.command = ['tetas'];
handler.tags = ['nsfw']
handler.group;
export default handler;