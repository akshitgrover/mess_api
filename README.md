

ACM Vit Mess-API

Baseurl : https://vitmess-api.herokuapp.com

Routes:
1.	Login: Baseurl/user/login/?regno=<regno>&password=<password> 
Response: 
if user is authenticated, ‘user:user details’,’mess:mess details’,’token:token’.
If user is not authenticated, ‘err:Couldn’t connect to server’,‘mess:details of every mess’,’token:token’,’user:user details’.


2.	Change Default Mess: Baseurl/user/chngmess/?code=<mess code>&token=<token>
Respose:
If error ‘err:something went wrong!’,’token:token’.
Else ‘flash:default mess added successfully!’,token:’token’.


3.	Get menu of full month: Baseurl/mess/getmenu/?code=<mess code>&token=<token> 
Response:
If error ‘err:something went wrong!’,’token:token’
Else ‘menu:mess menu’,’token:token’.

4.	Get present day menu: Baseurl/mess/getdaymenu/?code=<mess code>&token=<token>
Response:
If error ‘err:something went wrong!’,’token:token’
Else ‘menu:mess menu’,’token:token’.


5.	Get  full mess list: Baseurl/mess/getmess/?token=<token>
Response:
If error ‘err:something went wrong!’,’token:token’
Else ‘mess:mess list’,’token:token’
