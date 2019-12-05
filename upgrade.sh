#! /bin/sh
pipe=./update-listener
[ -p "$pipe" ] || mkfifo -m 0600 "$pipe" || exit 1
while :; do
    while read -r cmd; do
        if [ "$cmd" = "update" ]; then
            printf 'Updating server \n'
            git pull
        fi
    done <"$pipe"
done