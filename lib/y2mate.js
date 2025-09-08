import fetch from 'node-fetch'

const ytv = async (yutub) => {
  function post(url, formdata) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: "*/*",
        'accept-language': "en-US,en;q=0.9",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: new URLSearchParams(Object.entries(formdata))
    })
  }

  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(yutub)
  let url = 'https://youtu.be/' + ytId[1]

  let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  const mela = await res.json()

  let thumb = /<img.*?src="(.*?)"/.exec(mela.result)?.[1] || ""
  let title = /<b>(.*?)<\/b>/.exec(mela.result)?.[1] || ""
  let quality = /data-fquality="(.*?)"/.exec(mela.result)?.[1] || ""
  let tipe = /data-ftype="(.*?)"/.exec(mela.result)?.[1] || ""
  let size = /<td>([\d.]+ ?[MGK]B)<\/td>/.exec(mela.result)?.[1] || ""
  let id = /var k__id = "(.*?)"/.exec(mela.result)?.[1]

  let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
    type: 'youtube',
    _id: id,
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: tipe,
    fquality: quality
  })
  const meme = await res2.json()

  let link = /<a.*?href="(.*?)"/.exec(meme.result)?.[1] || ""

  return { thumb, title, quality, tipe, size, output: `${title}.${tipe}`, link }
}


const yta = async (yutub) => {
  function post(url, formdata) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: "*/*",
        'accept-language': "en-US,en;q=0.9",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: new URLSearchParams(Object.entries(formdata))
    })
  }

  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
  let ytId = ytIdRegex.exec(yutub)
  let url = 'https://youtu.be/' + ytId[1]

  let res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  const mela = await res.json()

  // sacar datos con regex
  let thumb = /<img.*?src="(.*?)"/.exec(mela.result)?.[1] || ""
  let title = /<b>(.*?)<\/b>/.exec(mela.result)?.[1] || ""
  let size = /<td>([\d.]+ ?[MGK]B)<\/td>/.exec(mela.result)?.[1] || ""
  let tipe = /data-ftype="(.*?)"/.exec(mela.result)?.[1] || "mp3"
  let quality = /data-fquality="(.*?)"/.exec(mela.result)?.[1] || "128"
  let id = /var k__id = "(.*?)"/.exec(mela.result)?.[1]

  let res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
    type: 'youtube',
    _id: id,
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: tipe,
    fquality: quality
  })
  const meme = await res2.json()

  let link = /<a.*?href="(.*?)"/.exec(meme.result)?.[1] || ""

  return { thumb, title, quality, tipe, size, output: `${title}.${tipe}`, link }
}

export { yta, ytv }
