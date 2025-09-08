#! /bin/bash
#Production 
git reset --hard
git checkout main 
git pull origin main 

npm i yarn -g
yarn global add serve
yarn 
yarn run build  
pm2 stop "future-furniture" || true
pm2 delete "future-furniture" || true
pm2 start "yarn run start:prod" --name "future-furniture"
pm2 save