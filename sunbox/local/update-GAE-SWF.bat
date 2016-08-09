@echo off
cd /d %~dp0
set urlC=https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/
set urlP=https://127.0.0.1:1080
wget -N --no-check-certificate -t 3 -e "https_proxy=%urlP%" %urlC%swf.rar
7z.exe e swf.rar -o..\swf -aoa
exit