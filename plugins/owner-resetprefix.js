const handler = async (m, { conn }) => {
    try {
        const user = m.sender; 
        const db = global.db.data.users;

        
        if (!db[user]) db[user] = {};

        
        db[user].prefix = global.prefix || '!';

        await m.reply(`✅ Tu prefix ha sido reiniciado al valor por defecto: ${db[user].prefix}`);
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al intentar resetear tu prefix.');
    }
}


handler.command = ['resetprefix'];
handler.private = true; 
handler.group = true;   
export default handler;