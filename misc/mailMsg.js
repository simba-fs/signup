module.exports = `<h1>Welcome to AURL!</h1>
<style>
	*{
		color: #333;
	}	
	a{
		text-decoration: none;
	}
</style>
<pre>
歡迎來到 AURL
您在剛剛用使用者名字 {username} 電子郵件 {email} 註冊了一個帳號
請用這個驗證碼驗證您的電子郵件

{token}

如果您對此沒有印象，也許是有人誤用了您了的電子郵件。請忽略這封信。很抱歉打擾您。
祝您有個美好的一天
AURL 開發團隊敬上

<hr>

You have registered a account with username {username}, email {email}.
Please varify your email by this token.

{token}

If you have no impression about this, maybe someone misappropriation your email. Please ignore this mail. Sorry to disturb you.

Have a nice day!
AURL developer team
</pre>
`;
