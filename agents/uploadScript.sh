#!/bin/sh -x 
echo "logging into webserver"
#responseToken = `curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username": "kambleroh", "password": "kambleroh"}' 'http://localhost:3000/api/Developers/login'`
json=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username": "huangjim", "password": "huangjim"}' 'http://localhost:3000/api/Developers/login') \
&& token=$(echo $json | sed "s/{.*\"id\":\"\([^\"]*\).*}/\1/g") \
&& echo "token = $token"
echo $token
#echo "Uploading json data"
#filename=logdata.json
#curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"username": "huangjim", "password": "huangjim"}' 'http://localhost:3000/api/Developers/login'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "time": "2018-09-06T03:03:52.097Z", "submitBy": 1, "category": "Scale_Rohit_ShellScript", "description": "Rohit_Shell_Script All systems are running", "status": "OK", "data":  "{\"StartTime\": \"13:45:00\", \"EndTime\": \"13:50:00\", \"info\": \"Complete all jobs\"}" }' "http://localhost:3000/api/Tasks?access_token=$token"
 

#'http://localhost:3000/api/Tasks?access_token=$token'
