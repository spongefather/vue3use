echo off
cd /d %~dp0
call yarn

call yarn build

move /Y ../dist ./dist

set COMPOSE_PROJECT_NAME=vue3use
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d