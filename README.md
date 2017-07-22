

ACM Vit Mess-API

Baseurl : https://vitmess-api.herokuapp.com

Routes:
1.	Login: Baseurl/user/login/?regno='regno'&password='password' <br>
Response: <br>
if user is authenticated, ‘user:user details’,’mess:mess details’,’token:token’.<br>
If user is not authenticated, ‘err:Couldn’t connect to server’,‘mess:details of every mess’,’token:token’,’user:user details’.<br>
<br>

2.	Change Default Mess: Baseurl/user/chngmess/?code='mess code'&token='token'<br>
Respose:<br>
If error ‘err:something went wrong!’,’token:token’.<br>
Else ‘flash:default mess added successfully!’,token:’token’.<br>
<br>

3.	Get menu of full month: Baseurl/mess/getmenu/?code='mess code'&token='token' <br>
Response:<br>
If error ‘err:something went wrong!’,’token:token’<br>
Else ‘menu:mess menu’,’token:token’.<br>

4.	Get present day menu: Baseurl/mess/getdaymenu/?code='mess code'&token='token'<br>
Response:<br>
If error ‘err:something went wrong!’,’token:token’<br>
Else ‘menu:mess menu’,’token:token’.<br>
<br>

5.	Get  full mess list: Baseurl/mess/getmess/?token='token'<br>
Response:<br>
If error ‘err:something went wrong!’,’token:token’<br>
Else ‘mess:mess list’,’token:token’<br>
