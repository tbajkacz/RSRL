set "SRVNAME=RSRL"
set "SRVPROJ=RSRL.Api"
set "WEBNAME=rsrl"

set "WEBBUILD=web\%WEBNAME%\build"

cd web\%WEBNAME%\
call npm install

cd ..\..
cd srv\%SRVNAME%\%SRVPROJ%\

COPY appsettings.json.sample appsettings.json

cd ..\..