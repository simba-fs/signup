#!/bin/bash
curl -sH "Content-Type: application/json"\
	--data '{
	"username": "kesdfasdnny",
	"password": "ss",
	"email": "sadsafimba.fs@gmail.com"
}' \
	http://localhost:3000/signup | jq '.'
