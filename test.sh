curl -sH "Content-Type: application/json"\
	--data '{
	"username": "simba-fs",
	"password": "ss",
	"email": "simba.fs@gmail.com"
}' \
	http://localhost:3000/signup | jq '.'

curl -sH "Content-Type: application/json"\
	--data '{
	"token": "007313",
	"email": "simba.fs@gmail.com"
}' \
	http://localhost:3000/signup/varify 
