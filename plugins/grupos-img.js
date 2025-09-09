//codigo creado por BrayanOFC 
import { exec } from 'child_process'
import { tmpdir } from 'os'
import path from 'path'
import fs from 'fs'

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('⚠️ Responde a un sticker para convertirlo en imagen.')
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) return m.reply('⚠️ Eso no parece ser un sticker.')

  let media = await m.quoted.download()
  let filename = path.join(tmpdir(), `sticker_${Date.now()}.webp`)
  fs.writeFileSync(filename, media)

  let out = filename.replace('.webp', '.jpg')
  exec(`ffmpeg -i ${filename} ${out}`, async (err) => {
    fs.unlinkSync(filename)
    if (err) return m.reply('❌ Error al convertir el sticker.')
    let img = fs.readFileSync(out)
    await conn.sendFile(m.chat, img, 'image.jpg', '✅ Aquí tienes tu foto.', m)
    fs.unlinkSync(out)
  })
}
handler.help = ['jpg','jpg']
handler.tags = ['grupo']
handler.command = ['jpg','img']
export default handler