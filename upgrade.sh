#! /bin/sh
pipe=./update-listener
[ -p "$pipe" ] || mkfifo -m 0600 "$pipe" || exit 1
while :; do
    while read -r cmd; do
        if [ "$cmd" = "update" ]; then
            printf 'Updating server \n'
            git pull
						sudo docker-compose build
						sudo docker-compose up -d
        fi
    done <"$pipe"
done