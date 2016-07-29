echo off
Title 備份Firefox設置資料夾
ECHO.&ECHO.即將開始Profiles打包。需要關閉Firefox程序，請保存必要的資料! 按任意鍵繼續！&PAUSE >NUL 2>NUL
@echo 關閉火狐瀏覽器后自動開始備份……
taskkill /im firefox.exe
@echo 延遲2秒 等待資料回存……
::延遲2秒 等待資料回存
ping -n 2 127.0.0.1>nul
rem 設置備份路徑以及臨時資料夾
cd /d %~dp0
::從批處理所在位置到設置資料夾（Profiles），共跨了3層
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profiles
rem 複製目標檔案到臨時資料夾

::::::::::::::::::::以下是資料夾::::::::::::::::::::
::擋廣告
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\ /s /y /i
::μblock設定
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
::各式樣式&UC腳本
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
::擴充套件
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
::bookmarkbackups 目錄儲存了書籤的備份檔案，可用於回復您的書籤。
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
::書籤、下載與瀏覽紀錄：places.sqlite 這個檔案包含您在 Firefox 的所有書籤、下載紀錄以及拜訪過的網站清單。
xcopy "%BackDir%\places.sqlite" %TempFolder%\ /y
::使用者儲存的帳戶和密碼：您的密碼儲存在 key3.db 及 logins.json 兩個檔案之中。
xcopy "%BackDir%\key3.db" %TempFolder%\ /y
xcopy "%BackDir%\logins.json" %TempFolder%\ /y
::使用者儲存的帳戶和密碼 (*新版已無此檔案 改成logins.json)
::xcopy "%BackDir%\signons.sqlite" %TempFolder%\ /y
::特殊網站設定：permissions.sqlite 及 content-prefs.sqlite 這兩個檔案儲存著許多 Firefox 的權限設定（例如你允許哪些網站顯示彈出視窗）或基於個別網站設置的縮放比例。
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\content-prefs.sqlite" %TempFolder%\ /y
::搜尋引擎：檔案 search.json.mozlz4 儲存了 Firefox 搜尋列裡所使用的的搜尋引擎。
::xcopy "%BackDir%\search.sqlite" %TempFolder%\ /y
::xcopy "%BackDir%\search.json" %TempFolder%\ /y
::個人字典：persdict.dat 儲存著你加入 Firefox 字典的所有自定義單字。
xcopy "%BackDir%\persdict.dat" %TempFolder%\ /y
::自動完成清單：formhistory.sqlite 儲存了你在搜尋列或網站的表單中輸入過的字串。
xcopy "%BackDir%\formhistory.sqlite" %TempFolder%\ /y
::Cookie：Cookie 是你去過的網站存放在你電腦中的一些資訊，通常是一些關於網站的偏好設定或登入狀態。所有的 Cookie 都儲存在 cookies.sqlite 這個檔案。
xcopy "%BackDir%\cookies.sqlite" %TempFolder%\ /y
::DOM 儲存空間： DOM 儲存空間設計的目的是提供一種比 Cookie 更大、更安全，而且易於使用的資訊儲存替代方案。關於網頁的資訊存放在 webappsstore.sqlite，而 chromeappsstore.sqlite 則存放各種 about:* 頁面。
xcopy "%BackDir%\webappsstore.sqlite" %TempFolder%\ /y
xcopy "%BackDir%\chromeappsstore.sqlite" %TempFolder%\ /y
::安全憑證設定：cert8.db 儲存你所有的安全憑證設定及匯入 Firefox 的 SSL 憑證。  
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
::安全裝置設定：secmod.db 這個檔案是安全性模組資料庫。 
xcopy "%BackDir%\secmod.db" %TempFolder%\ /y
::下載動作：mimeTypes.rdf 儲存你對於 Firefox 應如何處理特定格式檔案的偏好設定，例如你點選 PDF 檔時，直接以 Acrobat Reader 開啟它。
xcopy "%BackDir%\mimeTypes.rdf " %TempFolder%\ /y
::外掛程式 MIME 類型：pluginreg.dat 儲存關於你所安裝外掛程式的 網際網路媒體型式。
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\ /y
::瀏覽狀態：sessionstore.js 會儲存目前開啟中的分頁和視窗。
::xcopy "%BackDir%\sessionstore.js" %TempFolder%\ /y
::自訂工具列： xulstore.json這個檔案儲存了工具列及視窗大小與位置等設定值。
xcopy "%BackDir%\xulstore.json" %TempFolder%\ /y
::記憶了工具列按鈕的順序與位置 (*新版已無此檔案 改紀錄於xulstore.json)
::xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
::個人偏好設定：prefs.js 儲存了使用者自訂的偏好設定，例如你在 Firefox 選項 對話方塊中修改的設定。另一非必要的相關檔案是 user.js，如果有的話，裡面的設定會優先取代任何修改過的偏好設定。  
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y
::Stylish的樣式數據
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y
::foxyproxy的代理設定
::xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y

::需要刪除的項
::del %TempFolder%\chrome\UserScriptLoader\require\  /s /q
::del %TempFolder%\extensions\inspector@mozilla.org\chrome\inspector\locale\de\  /s /q
::del %TempFolder%\extensions\inspector@mozilla.org\chrome\inspector\locale\en-GB\  /s /q
::del %TempFolder%\extensions\inspector@mozilla.org\chrome\inspector\locale\pl\  /s /q
::del %TempFolder%\extensions\inspector@mozilla.org\chrome\inspector\locale\ru\  /s /q
::del %TempFolder%\extensions\inspector@mozilla.org\chrome\inspector\locale\sk\  /s /q
::del %TempFolder%\extensions\support@lastpass.com\platform\Darwin\  /s /q
::del %TempFolder%\extensions\support@lastpass.com\platform\Darwin_x86_64-gcc3\  /s /q
::del %TempFolder%\extensions\support@lastpass.com\platform\Linux_x86_64-gcc3\  /s /q
::del %TempFolder%\extensions\support@lastpass.com\platform\Linux_x86-gcc3\  /s /q

::讀取版本號和日期及時間
::從批處理所在位置到Firefox程序資料夾（firefox），共跨了4層
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)

::設置備份檔案路徑以及檔案名稱
::完整日期和時間
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
set ArchiveName=D:\FirefoxBackup\Profiles_Firefox_%ver%_%da1%年%da2%月%da3%日[%tm1%點%tm2%分%tm3%秒].7z
::小時數小於10點時的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set ArchiveName=D:\FirefoxBackup\Profiles_Firefox_%ver%_%da1%年%da2%月%da3%日[%tm1%點%tm2%分%tm3%秒].7z

rem 開始備份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 備份完成！並刪除臨時文件夾
rd "%TempFolder%" /s/q

ECHO.&ECHO.Firefox設置已打包完成，請按任意鍵 重啟Firefox 並退出CMD！&PAUSE >NUL 2>NUL

@echo 啟動瀏覽器
::"..\..\..\..\Firefox\firefox.exe" pcxFirefox便攜路徑
::"..\..\..\..\MyFirefox.exe" MyFirefox便攜路徑
start "Mozilla Firefox" "..\..\..\..\MyFirefox.exe"
::延遲4秒關閉CMD
::ping -n 4 127.0.0.1>nul