//código creado por BrayanOFC 
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix }) => {
  const emoji = '🔞'
  const emoji2 = '❌'

  if (m.isGroup && db?.data?.chats[m.chat] && !db.data.chats[m.chat].nsfw) {
    return m.reply(`${emoji} El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con » *${usedPrefix}nsfw on*`)
  }

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} Por favor, ingresa un tag para realizar la búsqueda.\n\nEjemplo: *${usedPrefix}r34 kirito*`,
      m
    )
  }

  const tag = args.join(' ')


  const USER_ID = '5267539'
  const API_KEY = 'dc12e2cb36b1bab5e941e7024bd2ac35dcdc9285bc047a4c99921bbfbc8ce5320b7f874de7e7e9ac23781ff9414f2cea88cb2e2cda77bfc36975576dc0fede0a'

  const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tag)}&user_id=${USER_ID}&api_key=${API_KEY}`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)' }
    })

    const data = await response.json()

    if (!data || data.length === 0) {
      return conn.reply(m.chat, `${emoji2} No hubo resultados para *${tag}*`, m)
    }

    const randomIndex = Math.floor(Math.random() * data.length)
    const randomImage = data[randomIndex]
    const imageUrl = randomImage.file_url

    await conn.sendMessage(
      m.chat,
      { image: { url: imageUrl }, caption: `${emoji} Resultados para » *${tag}*`, mentions: [m.sender] },
      { quoted: m }
    )
  } catch (error) {
    console.error(error)
    await m.reply(`${emoji2} Ocurrió un error al buscar.`)
  }
}

handler.help = ['r34 <tag>', 'rule34 <tag>']
handler.command = ['r34', 'rule34']
handler.tags = ['nsfw']

export default handler