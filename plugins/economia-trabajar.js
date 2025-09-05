var handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let cooldown = 7 * 60 * 1000;
    let time = user.lastwork + cooldown;

    if (new Date() - user.lastwork < cooldown) {
        return conn.reply(m.chat, `🌟 Debes esperar ${msToTime(time - new Date())} antes de volver a trabajar.`, m);
    }

    let monedas = 200;

    user.coin += monedas;
    user.lastwork = Date.now();

    let trabajos = [
        "cocinero 🍳",
        "albañil 👷",
        "programador 💻",
        "mesero 🍽️",
        "doctor 🩺",
        "pescador 🎣",
        "cantante 🎤",
        "mecánico 🔧", 
        "policia 🚔"
    ];
    let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];

    conn.reply(m.chat, `👷 ¡Has trabajado como *${trabajo}*!\n💸 Ganaste: *${moneda}* monedas\n> ✐ Ahora tienes: *${user.coin}* monedas.`, m);
}

handler.help = ['trabajar'];
handler.tags = ['rpg'];
handler.command = ['trabajar', 'work'];
handler.group = true;

export default handler;

function msToTime(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let seconds = Math.floor((duration / 1000) % 60);

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + " minutos " + seconds + " segundos";
}