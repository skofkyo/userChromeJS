echo off
rem ³]¸m³Æ¥÷¸ô®|¥H¤ÎÁ{®É¤å¥ó§¨
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profiles

rem ½Æ»s¥Ø¼Ð¤å¥ó¨ìÁ{®É¤å¥ó§¨

::§R°£§Ö¨ú
del %BackDir%\chrome\UserScriptLoader\require\ /s /q
del %BackDir%\chrome\UserScriptLoader\temp\ /s /q

::¥H¤U¬O¤å¥óƒH
xcopy "%BackDir%\adblockedge" %TempFolder%\adblockedge\ /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
xcopy "%BackDir%\scriptish_scripts" %TempFolder%\scriptish_scripts\ /s /y /i

::¥H¤U¬O¤å¥ó
xcopy "%BackDir%\addons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
xcopy "%BackDir%\extensions.json" %TempFolder%\ /y
xcopy "%BackDir%\extensions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\key3.db" %TempFolder%\ /y
xcopy "%BackDir%\signons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\logins.json" %TempFolder%\ /y
xcopy "%BackDir%\places.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\extensions.ini" %TempFolder%\ /y
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y

::Åª¨úª©¥»¸¹©M¤é´Á¤Î®É¶¡
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
set hour=%time:~,2%
if "%time:~,1%"==" " set hour=%time:~1,1%
set backupTime=%date:~0,4%-%date:~5,2%-%date:~8,2%,%hour%-%time:~3,2%-%time:~6,2% 
::³]¸m³Æ¥÷¤å¥ó¸ô®|¥H¤Î¤å¥ó¦W
set ArchiveName=d:\FirefoxBackup\Profiles_%ver%_%date:~0,4%-%date:~5,2%-%date:~8,2%,%hour%H-%time:~3,2%m-%time:~6,2%s.7z
rem ¶}©l³Æ¥÷
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo ³Æ¥÷§¹¦¨¡I§R°£Á{®É¤å¥ó§¨
rd "%TempFolder%" /s/q
