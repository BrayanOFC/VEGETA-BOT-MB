//codigo creado por BrayanOFC 
import fs from 'fs'
import { exec } from 'child_process'
import { tmpdir } from 'os'
import path from 'path'

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('⚠️ Responde a un sticker o video.')
  let mime = m.quoted.mimetype || ''
  
  if (!/webp|video/.test(mime)) return m.reply('⚠️ Solo funciona con stickers o videos.')

  try {
    let media = await m.quoted.download()
    let filename = path.join(tmpdir(), `file_${Date.now()}`)
    fs.writeFileSync(`${filename}`, media)

    let out = ''

    if (/webp/.test(mime)) {
      out = `${filename}.png`
      exec(`ffmpeg -y -i "${filename}" "${out}"`, async (err) => {
        fs.unlinkSync(filename)
        if (err) {
          console.error(err)
          return m.reply('❌ Error al convertir el sticker.')
        }
        let img = fs.readFileSync(out)
        await conn.sendFile(m.chat, img, 'sticker.png', '✅ Aquí está tu foto.', m)
        fs.unlinkSync(out)
      })
    } else if (/video/.test(mime)) {
      out = `${filename}.mp4`
      exec(`ffmpeg -y -i "${filename}" -c copy "${out}"`, async (err) => {
        fs.unlinkSync(filename)
        if (err) {
          console.error(err)
          return m.reply('❌ Error al convertir el video.')
        }
        let vid = fs.readFileSync(out)
        await conn.sendFile(m.chat, vid, 'video.mp4', '✅ Aquí está tu video.', m)
        fs.unlinkSync(out)
      })
    }

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al procesar el archivo.')
  }
}
handler.help = ['img','mp4']
handler.tags = ['grupo']
handler.command = ['jpg','img']
export default handler