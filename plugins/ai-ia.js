import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
    const username = `${conn.getName(m.sender)}`
    const basePrompt = `Tu nombre es ${botname}, creado por Brayan, versión 2.1.5. Hablas Español. Llamarás a las personas por su nombre ${username}, eres divertida, curiosa y muy amigable. ¡Eres tan poderosa como un Super Saiyajin! ${username}`

    if (isQuotedImage) {
        const q = m.quoted
        const img = await q.download?.()
        if (!img) {
            console.error('⚠️ Error: No image buffer available')
            return conn.reply(m.chat, '💥 ¡Oh no! ChatGpT no pudo descargar la imagen.', m, fake)
        }
        const content = '🌟 Describe la imagen como si fueras un guerrero Saiyajin:'
        try {
            const imageAnalysis = await fetchImageBuffer(content, img)
            const query = '🔥 Descríbeme la imagen y explica por qué actúan así. Además, dime quién eres como si fueras un personaje de Dragon Ball.'
            const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
            const description = await luminsesi(query, username, prompt)
            await conn.reply(m.chat, description, m, fake)
        } catch {
            await m.react('⚠️')
            await conn.reply(m.chat, '💥 ChatGpT no pudo analizar la imagen.', m, fake)
        }
    } else {
        if (!text) { 
            return conn.reply(m.chat, `🌟 Ingresa tu pedido para que ChatGpT lo responda con poder Saiyajin.`, m)
        }
        await m.react('⏳')
        try {
            const { key } = await conn.sendMessage(m.chat, {text: `⚡ ChatGPT está canalizando energía para responder tu petición, espera un momento...`}, {quoted: m})
            const query = text
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
            const response = await luminsesi(query, username, prompt)
            await conn.sendMessage(m.chat, {text: response, edit: key})
            await m.react('💥')
        } catch {
            await m.react('❌')
            await conn.reply(m.chat, '💥 ChatGpT no puede responder a esa pregunta.', m, fake)
        }
    }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt']

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: imageBuffer 
        }, {
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        })
        return response.data.result
    } catch (error) {
        console.error('⚠️ Error al obtener:', error)
        throw error
    }
}