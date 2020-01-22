set "WEBNAME=rsrl"
set "WEBBUILD=web\%WEBNAME%\build"

cd web\%WEBNAME%\
call npm install

cd ..\..