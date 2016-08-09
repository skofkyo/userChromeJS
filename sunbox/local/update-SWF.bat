@Echo Off
cd /d %~dp0
set urlC=https://raw.githubusercontent.com/jiayiming/FireLocalSWF/master/
wget.exe -N --no-check-certificate %urlC%swf.rar
7z.exe e swf.rar -o..\swf -aoa