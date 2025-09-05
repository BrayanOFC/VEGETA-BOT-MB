#!/data/data/com.termux/files/usr/bin/bash
# Código creado por gata Dios -Modificado por BrayanOFC

# Comandos sugeridos en caso de fallo
COMANDOS="pkg install git -y\npkg install nodejs -y\npkg install ffmpeg -y\npkg install imagemagick -y\npkg install -y yarn\ngit clone https://github.com/BrayanOFC/VEGETA-BOT-MB\ncd VEGETA-BOT-MB\nyarn install\nnpm install\nnpm start"

# Verifica conexión a internet
ping -c 1 google.com &>/dev/null
if [ $? -ne 0 ]; then
  echo -e "\033[0;31mSin conexión a Internet. Verifique su red e intente nuevamente.\033[0m"
  exit 1
fi

echo -e "\e[35m
⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣿⣿⣿⣷⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣼⣿⣿⠟⠋⠉⠙⠻⣿⣧⠀⠀⠀⢀⣤⡄⠀⠀⠀⠀
⠀⢸⣿⣿⡏⠀⣤⣤⣤⣄⠘⣿⣿⠀⢰⣿⣿⡇⠀⠀⠀⠀
⠀⣿⣿⣿⡇⠀⣿⣿⣿⣿⠀⢸⣿⠀⢸⣿⣿⡇⠀⠀⠀⠀
⠀⠹⣿⣿⡇⠀⠈⠉⠉⠁⠀⢸⣿⠀⢸⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠙⢿⣿⣄⠀⠀⠀⠀⣠⣿⠇⠀⢸⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⡿⠋⠀⠀⠘⠿⠿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    𝑽𝑬𝑮𝑬𝑻𝑨 𝑩𝑶𝑻 𝑴𝑩 ⚡
   «¡VERGA DE BRAYANOFC!» 😂
\e[0m"

echo -e "\033[01;93mPreparando instalación...\nPreparing installation...\033[0m"
echo -e "\033[01;32mInstalando dependencias...\033[0m"

# Función de instalación genérica
instalar_dependencia() {
  local paquete=$1
  local comando_check=$2

  if command -v $comando_check >/dev/null 2>&1; then
    echo -e "\033[01;33m$paquete ya estaba instalado anteriormente.\033[0m"
  else
    salida=$(pkg install $paquete -y 2>&1)
    if echo "$salida" | grep -E -i -q '(command not found|unable to locate package|Could not get lock|Failed to fetch|404|503|504|Timeout|Temporary failure)'; then
      echo -e "\033[0;31mError al instalar $paquete:\n$salida\033[0m"
      echo -e "\033[0;34mIntente instalarlo manualmente:\n$COMANDOS\033[0m"
      exit 1
    else
      echo -e "\033[01;32m$paquete se ha instalado correctamente.\033[0m"
    fi
  fi
}

# Instalación paso a paso
instalar_dependencia git git
instalar_dependencia nodejs node
instalar_dependencia ffmpeg ffmpeg
instalar_dependencia imagemagick convert

# Yarn desde npm si no está instalado
if command -v yarn >/dev/null 2>&1; then
  echo -e "\033[01;33mYarn ya estaba instalado anteriormente.\033[0m"
else
  salida=$(npm install -g yarn 2>&1)
  if echo "$salida" | grep -E -i -q '(command not found|unable to locate package|Could not get lock|Failed to fetch|404|503|504|Timeout|Temporary failure)'; then
    echo -e "\033[0;31mError al instalar yarn:\n$salida\033[0m"
    echo -e "\033[0;34mInstálelo manualmente:\n$COMANDOS\033[0m"
    exit 1
  else
    echo -e "\033[01;32mYarn se ha instalado correctamente.\033[0m"
  fi
fi

# Clonar repositorio
echo -e "\033[1;35mClonando el repositorio de VEGETA-BOT-MB...\033[0m"
git clone https://github.com/BrayanOFC/VEGETA-BOT-MB.git
echo -e "\033[01;32mClonación completada correctamente.\033[0m"

cd VEGETA-BOT-MB || { echo "No se pudo entrar al directorio VEGETA-BOT-MB"; exit 1; }

# Instalar dependencias del proyecto
echo -e "\033[0;34mInstalando dependencias del proyecto con yarn...\033[0m"
salida_yarn=$(yarn install 2>&1)
if echo "$salida_yarn" | grep -E -i -q '(command not found|unable to locate package|Could not get lock|Failed to fetch|404|503|504|Timeout|Temporary failure)'; then
  echo -e "\033[0;31mError:\n$salida_yarn\033[0m"
  exit 1
else
  echo -e "\033[01;32mDependencias de yarn instaladas correctamente.\033[0m"
fi

# NPM install
echo -e "\033[0;34mInstalando dependencias NPM...\033[0m"
salida_npm=$(npm install 2>&1)
if echo "$salida_npm" | grep -E -i -q '(command not found|unable to locate package|Could not get lock|Failed to fetch|404|503|504|Timeout|Temporary failure)'; then
  echo -e "\033[0;31mError:\n$salida_npm\033[0m"
  exit 1
else
  echo -e "\033[01;32mDependencias de npm instaladas correctamente.\033[0m"
fi

# Mensaje final estilo Vegeta
clear
echo -e "\e[36m
┏━━━━━━━━━⪩
┃  🔥  𝐈𝐍𝐅𝐎 𝐃𝐄 𝐈𝐍𝐒𝐓𝐀𝐋𝐀𝐂𝐈𝐎́𝐍
┃⏤͟͟͞͞ 𝑽𝑬𝑮𝑬𝑻𝑨 - 𝑩𝑶𝑻 - 𝑴𝑩
┗━━━━━━━━━⪩

✰ Creado por:
» BrayanOFC  
✰ Créditos:
» Comunidad Open Source  
✰ GitHub:
» https://github.com/BrayanOFC
✰ Inspirado en:
» Vegeta - Dragon Ball Z ⚡

「 ¡El orgullo Saiyajin en tu terminal! 」
\e[0m"

# Inicio
echo -e "\033[01;32mIniciando VEGETA-BOT-MB...\033[0m"
npm start