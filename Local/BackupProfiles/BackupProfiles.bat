echo off
rem 設置備份路徑以及臨時文件夾
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profiles

rem 複製目標文件到臨時文件夾

::刪除快取
del %BackDir%\chrome\UserScriptLoader\require\ /s /q

::以下是資料夾
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\ /s /y /i
xcopy "%BackDir%\adblockedge" %TempFolder%\adblockedge\ /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
xcopy "%BackDir%\scriptish_scripts" %TempFolder%\scriptish_scripts\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i

::以下是檔案
xcopy "%BackDir%\addons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
xcopy "%BackDir%\cookies.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\extensions.json" %TempFolder%\ /y
xcopy "%BackDir%\extensions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\extensions.ini" %TempFolder%\ /y
xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y
xcopy "%BackDir%\key3.db" %TempFolder%\ /y
xcopy "%BackDir%\signons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\logins.json" %TempFolder%\ /y
xcopy "%BackDir%\places.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y

::讀取版本號和日期及時間
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
set hour=%time:~,2%
if "%time:~,1%"==" " set hour=%time:~1,1%
set backupTime=%date:~0,4%-%date:~5,2%-%date:~8,2%,%hour%-%time:~3,2%-%time:~6,2% 
::設置備份文件路徑以及文件名
set ArchiveName=d:\FirefoxBackup\Profiles_pcx%ver%_%date:~0,4%-%date:~5,2%-%date:~8,2%[%hour%h-%time:~3,2%m-%time:~6,2%s].7z
rem 開始備份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 備份完成！刪除臨時文件夾
rd "%TempFolder%" /s/q
