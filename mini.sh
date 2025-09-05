#!/data/data/com.termux/files/usr/bin/bash
# Código creado por @gata_dios - Modificado por the Carlos 

# Comandos sugeridos en caso de fallo
COMANDOS="pkg install git -y\npkg install nodejs -y\npkg install ffmpeg -y\npkg install imagemagick -y\npkg install -y yarn\ngit clone https://github.com/thecarlos19/black-clover-MD\ncd black-clover-MD\nyarn install\nnpm install\nnpm start"

# Verifica conexión a internet
ping -c 1 google.com &>/dev/null
if [ $? -ne 0 ]; then
  echo -e "\033[0;31mSin conexión a Internet. Verifique su red e intente nuevamente.\033[0m"
  exit 1
fi

# Arte inicial
echo -e "\e[35m
_░▒███████
░██▓▒░░▒▓██
██▓▒░__░▒▓██___██████
██▓▒░____░▓███▓__░▒▓██
██▓▒░___░▓██▓_____░▒▓██
██▓▒░_______________░▒▓██
_██▓▒░______________░▒▓██
__██▓▒░____________░▒▓██
___██▓▒░__________░▒▓██
____██▓▒░________░▒▓██
_____██▓▒░_____░▒▓██
______██▓▒░__░▒▓██
_______█▓▒░░▒▓██
_________░▒▓██
_______░▒▓██
_____░▒▓██\n\e[0m"

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
echo -e "\033[1;35mClonando el repositorio de Black Clover-MD...\033[0m"
git clone https://github.com/thecarlos19/black-clover-MD.git
echo -e "\033[01;32mClonación completada correctamente.\033[0m"

cd black-clover-MD || { echo "No se pudo entrar al directorio black-clover-MD"; exit 1; }

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

# Mensaje final
clear
echo -e "\e[36m
┏━━━━━━━━━⪩
┃˚₊ · ͟͟͞͞➳❥ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍
┃⏤͟͟͞͞ Black Clover - MD
┗━━━━━━━━━⪩

✰ Mode by:
» the Carlos 
✰ Créditos:
» devdiego 
✰ GitHub:
» https://github.com/Dev-Diego
✰ Número del creador del bot:
» +52 5544876071

𝐆 𝐑 𝐀 𝐂 𝐈 𝐀 𝐒, 𝐏 𝐎 𝐑, 𝐏 𝐑 𝐄 𝐅 𝐄 𝐑 𝐈 𝐑 𝐍 𝐎 𝐒\n\e[0m"

# Inicio
echo -e "\033[01;32mIniciando Black Clover Bot...\033[0m"
npm start