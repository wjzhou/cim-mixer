cd %~dp0\reverse-proxy
start "traefik" cmd /c traefik.exe

cd %~dp0
yarn start