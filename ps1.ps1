# $Argの中身は「カレントディレクトリにするpath」「denoのpath」「denoの起動オプション」「カレントディレクトリからの実行ファイルへの相対path」
Param
(
  $CurrentFolder,
  $Deno,
  $DenoOption,
  $TS
)

cd $CurrentFolder.Trim('"')
echo ("カレントディレクトリ > " + $CurrentFolder)

Start-Process -FilePath $Deno -ArgumentList "run", $DenoOption, $TS -Wait
