set "SRVNAME=RSRL"
set "SRVPROJ=RSRL.Api"
set "WEBNAME=rsrl"

set "WWWROOT=srv\%SRVNAME%\%SRVPROJ%\wwwroot"
set "WEBBUILD=web\%WEBNAME%\build"

cd web\%WEBNAME%\
call npm run-script build
cd ..\..

IF EXIST %WWWROOT% (
    FOR /D %%p IN ("%WWWROOT%\*.*") DO rmdir "%%p" /S /Q
    del %WWWROOT%\*.* /F /Q
)

IF NOT EXIST %WWWROOT% (
	MKDIR %WWWROOT%
)

xcopy /e /v %WEBBUILD% %WWWROOT%

cd srv\%SRVNAME%\%SRVPROJ%\

call dotnet build -c Release

cd ..\..\..
