REM cmd.exeではUNC Pathをカレントディレクトリにできない。
REM denoはマルチバイト文字を含むPathをコマンドライン引数として受け取れない(URIエンコードされた文字列になっちゃう)
REM 上記理由により、このバッチファイルはUNC Path上では使用できない。

REM powershellならUNC Pathをカレントディレクトリにできる。
REM しかしps1ファイルを実行できるようにするためには予め設定が必要。
REM 設定無しでpowershellを利用するためにバッチファイルを経由してpowershellを使用する。

powershell -ExecutionPolicy Bypass -file "%~dp0ps1.ps1" -CurrentFolder """"%~dp0"" -Deno "C:\deno\1.14.1\deno" -DenoOption "--allow-net --allow-run --allow-read --allow-write" -TS "main.ts"
pause
