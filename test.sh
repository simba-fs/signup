#!/bin/bash
curl -sH "Content-Type: application/json"\
	--data '{
	"username": "simba-fs",
	"password": "ss",
	"email": "simba.fs@gmail.com"
}' \
	http://localhost:3000/signup | jq '.'
