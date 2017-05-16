#!/usr/bin/env bash
echo 'make sure this machine have installed https://github.com/sequelize/sequelize-auto '
echo 'execute me with params:${ip} ${port} ${dbName} ${username} ${password}'
echo 'for example:xxx.sh 127.0.0.1 3306 web_starter root kaicui'


sequelize-auto -h ${1} -p ${2} -d ${3} -u ${4} -x ${5} -e mysql -a "./model-option.json" -c "./gen-option.json"

echo 'generate success!see in ./generated dir'
