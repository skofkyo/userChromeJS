echo off
@echo 關閉火狐瀏覽器后自動開始備份……
taskkill /im firefox.exe
@echo 延遲3秒 等待資料回存……
::延遲3秒 等待資料回存
ping -n 3 127.0.0.1>nul
rem 設置備份路徑以及臨時文件夾
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profiles
::刪除快取
del %BackDir%\chrome\UserScriptLoader\require\ /s /q
rem 複製目標文件到臨時文件夾
::::::::::::::::::::以下是資料夾::::::::::::::::::::
::擋廣告
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\ /s /y /i
xcopy "%BackDir%\adblockedge" %TempFolder%\adblockedge\ /s /y /i
::μblock設定
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
::各式樣式&UC腳本
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
::擴充套件
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
::書籤的備份檔案
::xcopy "%BackDir%\bookmarkbackups" %TempFolder%\bookmarkbackups\ /s /y /i
::使用者腳本
xcopy "%BackDir%\scriptish_scripts" %TempFolder%\scriptish_scripts\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i
::搜尋引擎資料夾
::xcopy "%BackDir%\searchplugins" %TempFolder%\searchplugins\ /s /y /i
::::::::::::::::::::以下是檔案::::::::::::::::::::
::擴充套件
xcopy "%BackDir%\addons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\extensions.json" %TempFolder%\ /y
xcopy "%BackDir%\extensions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\extensions.ini" %TempFolder%\ /y
::安全憑證設定  儲存你所有的安全憑證設定及匯入 Firefox 的 SSL 憑證。 
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
::Cookie Cookie 是你去過的網站存放在你電腦中的一些資訊，通常是一些關於網站的偏好設定或登入狀態。
xcopy "%BackDir%\cookies.sqlite" %TempFolder%\ /y
::使用者儲存的帳戶和密碼
xcopy "%BackDir%\key3.db" %TempFolder%\ /y
xcopy "%BackDir%\signons.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\logins.json" %TempFolder%\ /y
::書籤、下載與瀏覽紀錄 這個檔案包含您在 Firefox 的所有書籤、下載紀錄以及拜訪過的網站清單。
xcopy "%BackDir%\places.sqlite" %TempFolder%\ /y
::特殊網站設定 Firefox 的權限設定（例如你允許哪些網站顯示彈出視窗）或基於個別網站設置的縮放比例。
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\content-prefs.sqlite" %TempFolder%\ /y
::自動完成清單 儲存了你在搜尋列或網站的表單中輸入過的字串。
xcopy "%BackDir%\formhistory.sqlite" %TempFolder%\ /y
::記憶了工具列按鈕的順序與位置
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
::個人偏好設定 prefs.js 儲存了使用者自訂的偏好設定，例如你在 Firefox 選項 對話方塊中修改的設定。另一非必要的相關檔案是 user.js，如果有的話，裡面的設定會優先取代任何修改過的偏好設定。 
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y
::Stylish的樣式數據
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y
::LastPass
xcopy "%BackDir%\lp.loginpws" %TempFolder%\ /y
xcopy "%BackDir%\lp.suid" %TempFolder%\ /y
::foxyproxy的代理設定
xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y
::自訂工具列 檔案儲存了工具列及視窗大小與位置等設定值。
::xcopy "%BackDir%\xulstore.json" %TempFolder%\ /y
::下載動作 儲存你對於 Firefox 應如何處理特定格式檔案的偏好設定，例如你點選 PDF 檔時，直接以 Acrobat Reader 開啟它。
::xcopy "%BackDir%\mimeTypes.rdf " %TempFolder%\ /y
::搜尋引擎  儲存了 Firefox 搜尋列裡所使用的的搜尋引擎。 
::xcopy "%BackDir%\search.sqlite" %TempFolder%\ /y
::xcopy "%BackDir%\search.json" %TempFolder%\ /y
::個人字典
::xcopy "%BackDir%\persdict.dat" %TempFolder%\ /y
::DOM 存儲 DOM 存儲設計的目的是提供一種比 Cookie 更大、更安全，而且易於使用的資訊存儲替代方案。關於網頁的資訊存放在 webappsstore.sqlite，而 chromeappsstore.sqlite 則存放各種 about:* 頁面。 
::xcopy "%BackDir%\webappsstore.sqlite" %TempFolder%\ /y
::xcopy "%BackDir%\chromeappsstore.sqlite" %TempFolder%\ /y
::外掛程式 MIME 類型 儲存關於你所安裝外掛程式的 網際網路媒體型式。
::xcopy "%BackDir%\pluginreg.dat" %TempFolder%\ /y
::瀏覽狀態 會儲存目前開啟中的分頁和視窗。
::xcopy "%BackDir%\sessionstore.js" %TempFolder%\ /y

::讀取版本號和日期及時間
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
set hour=%time:~,2%
if "%time:~,1%"==" " set hour=%time:~1,1%
set backupTime=%date:~0,4%-%date:~5,2%-%date:~8,2%,%hour%-%time:~3,2%-%time:~6,2% 
::設置備份文件路徑以及文件名
set ArchiveName=d:\FirefoxBackup\Profiles_Firefox_%ver%_%date:~0,4%年-%date:~5,2%月-%date:~8,2%日[%hour%點-%time:~3,2%分-%time:~6,2%秒].7z
rem 開始備份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 備份完成！刪除臨時文件夾
rd "%TempFolder%" /s/q
@echo 啟動瀏覽器
::"..\..\..\..\Firefox\firefox.exe" pcxFirefox便攜路徑
::"..\..\..\..\MyFirefox.exe" MyFirefox便攜路徑
start "Mozilla Firefox" "..\..\..\..\MyFirefox.exe"
::延遲4秒關閉CMD
ping -n 4 127.0.0.1>nul