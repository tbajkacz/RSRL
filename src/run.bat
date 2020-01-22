set "SRVNAME=RSRL"
set "SRVPROJ=RSRL.Api"
set "WWWROOT=srv\%SRVNAME%\%SRVPROJ%\wwwroot"

cd srv\%SRVNAME%\%SRVPROJ%\

dotnet run -c Release --p 6001