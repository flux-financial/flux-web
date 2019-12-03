#!/usr/bin/zsh

git pull
sudo docker-compose build
sudo docker-compose pull
sudo docker-compose up -d
