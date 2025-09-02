// BrayanOFC >> https://github.com/BrayanOFC

import fs from 'fs';
import path from 'path';

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🔥'); 
        conn.sendPresenceUpdate('composing', m.chat);

        const pluginsDir = './plugins';

        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

        let response = `🔥 *ℝ𝔼𝕍𝕀𝕊𝕀𝕆ℕ 𝔻𝔼 𝕊𝕐ℕ𝕋𝔸𝕏 𝔼ℝℝ𝕆ℝ𝕊:*\n\n`;
        let hasErrors = false;

        for (const file of files) {
            try {
                await import(path.resolve(pluginsDir, file));
            } catch (error) {
                hasErrors = true;
                response += `✧ *Error en:* ${file}\n${error.message}\n\n`;
            }
        }

        if (!hasErrors) {
            response += '👁️ ¡𝑻𝑶𝑫𝑶 𝑬𝑺𝑻𝑨 𝑬𝑵 𝑶𝑹𝑫𝑬𝑵! 𝑵𝑶 𝑺𝑬 𝑫𝑬𝑻𝑬𝑪𝑻𝑨𝑹𝑶𝐍 𝑬𝑹𝑹𝑶𝑹𝑬𝑺 𝑫𝑬 𝑺𝑰𝑵𝑻𝑨𝑿𝑰𝑺.';
        }

        await conn.reply(m.chat, response, m);
        await m.react('🔥');
    } catch (err) {
        await m.react('✖️'); 
        console.error(err);
        conn.reply(m.chat, '❀ *Ocurrió un fallo al verificar los plugins.*', m);
    }
};

handler.command = ['errores'];
handler.help = ['errores'];
handler.tags = ['tools'];

export default handler;