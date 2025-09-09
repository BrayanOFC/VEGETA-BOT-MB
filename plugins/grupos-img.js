//codigo creado por BrayanOFC 
import fs from 'fs'
import { exec } from 'child_process'
import { tmpdir } from 'os'
import path from 'path'

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('⚠️ Responde a un sticker para convertirlo en imagen.')
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) return m.reply('⚠️ Eso no parece ser un sticker.')

  try {
    let media = await m.quoted.download()
    let filename = path.join(tmpdir(), `sticker_${Date.now()}.webp`)
    fs.writeFileSync(filename, media)

    let out = filename.replace('.webp', '.png')

    exec(`ffmpeg -y -i "${filename}" "${out}"`, async (err) => {
      fs.unlinkSync(filename)
      if (err) {
        console.error(err)
        return m.reply('❌ Ocurrió un error al convertir el sticker.')
      }

      let img = fs.readFileSync(out)
      await conn.sendFile(m.chat, img, 'sticker.png', '✅ Aquí está tu foto.', m)
      fs.unlinkSync(out)
    })
  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar el archivo.')
  }
}
handler.help = ['img','jpg']
handler.tags = ['grupo']
handler.command = ['jpg','img']
export default handler