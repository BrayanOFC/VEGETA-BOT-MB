// Código creado por BrayanOFC
let handler = async (m, { conn }) => {
    try {
        const info = `
*↻ 🚀 Reiniciando bot... ↷*
        `.trim();

        await conn.reply(m.chat, info, m);

        setTimeout(() => {
            process.exit(0); 
        }, 2000);

    } catch (error) {
        console.error('[ERROR][REINICIO]', error);
        await conn.reply(m.chat, `❌ Error\n${error.message || error}`, m);
    }
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;