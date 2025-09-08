import fetch from 'node-fetch'
import axios from 'axios'

// 📘 Descargar imágenes de sekaikomik
async function sekaikomikDl(url) {
    let res = await fetch(url)
    let html = await res.text()

    // Busca el script que contiene "images"
    let match = html.match(/"images":(\[.*?\])/)
    if (!match) return []

    let data = JSON.parse(match[1])
    return data.map(v => encodeURI(v))
}

// 📘 Descargar videos de Facebook
async function facebookDl(url) {
    let res = await fetch('https://fdownloader.net/')
    let html = await res.text()

    // Extraer token con regex
    let token = /name="__RequestVerificationToken" type="hidden" value="(.*?)"/.exec(html)?.[1]

    let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
        method: 'post',
        headers: {
            cookie: res.headers.get('set-cookie'),
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            referer: 'https://fdownloader.net/'
        },
        body: new URLSearchParams({ __RequestVerificationToken: token, q: url })
    })).json()

    let result = {}
    let regex = /<a[^>]+class="button is-success is-small download-link-fb"[^>]+href="(.*?)"[^>]+title="Download (.*?)"/g
    let match
    while ((match = regex.exec(json.data)) !== null) {
        let link = match[1]
        let quality = match[2]
        result[quality] = link
    }
    return result
}

// 📘 Stalk de TikTok
async function tiktokStalk(user) {
    let res = await axios.get(`https://urlebird.com/user/${user}/`)
    let html = res.data
    let obj = {}

    obj.pp_user = /<div class="col-md-auto.*?<img src="(.*?)"/s.exec(html)?.[1] || ""
    obj.name = /<h1 class="user">(.*?)<\/h1>/.exec(html)?.[1]?.trim() || ""
    obj.username = /<div class="content">\s*<h5>(.*?)<\/h5>/.exec(html)?.[1]?.trim() || ""
    obj.followers = /Followers<\/span>\s*<strong>(.*?)<\/strong>/.exec(html)?.[1] || ""
    obj.following = /Following<\/span>\s*<strong>(.*?)<\/strong>/.exec(html)?.[1] || ""
    obj.description = /<div class="content">\s*<p>(.*?)<\/p>/.exec(html)?.[1]?.trim() || ""

    return obj
}

// 📘 Stalk de Instagram
async function igStalk(username) {
    username = username.replace(/^@/, '')
    const html = await (await fetch(`https://dumpor.com/v/${username}`)).text()

    let name = /<div class="user__title">\s*<a[^>]*>\s*<h1>(.*?)<\/h1>/.exec(html)?.[1]?.trim() || ""
    let Uname = /<div class="user__title">\s*<h4>(.*?)<\/h4>/.exec(html)?.[1]?.trim() || ""
    let description = /<div class="user__info-desc">(.*?)<\/div>/.exec(html)?.[1]?.trim() || ""
    let profilePic = /background-image:\s*url\('(.*?)'\)/.exec(html)?.[1] || ""

    // Extraer posts, followers, following
    let posts = parseInt(/Posts<\/div>\s*<div[^>]*>(.*?)<\/div>/.exec(html)?.[1]?.replace(/\D/g, '') || "0")
    let followers = parseInt(/Followers<\/div>\s*<div[^>]*>(.*?)<\/div>/.exec(html)?.[1]?.replace(/\D/g, '') || "0")
    let following = parseInt(/Following<\/div>\s*<div[^>]*>(.*?)<\/div>/.exec(html)?.[1]?.replace(/\D/g, '') || "0")

    return {
        name,
        username: Uname,
        description,
        posts,
        followers,
        following,
        profilePic
    }
}

export {
    sekaikomikDl,
    igStalk,
    facebookDl,
    tiktokStalk
}