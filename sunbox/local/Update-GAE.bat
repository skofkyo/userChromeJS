@Echo Off
Title 自动更新阳光盒子维护的 Goagent 最新可用 IP 组
cd /d %~dp0
del "goagent\proxy.ini"
wget --ca-certificate=ca-bundle.crt -c http://sunbox.cc/goagentip/proxy.ini
copy /y "%~dp0proxy.ini" goagent\proxy.ini
del "%~dp0proxy.ini"
taskkill /f /t /im goagent.exe
taskkill /f /t /im python27.exe
goagent\startgoa.exe
ECHO.&ECHO.更新完成,请重启goagent软件,并按任意键退出! &PAUSE >NUL 2>NUL