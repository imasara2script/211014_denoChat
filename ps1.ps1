# $Arg�̒��g�́u�J�����g�f�B���N�g���ɂ���path�v�udeno��path�v�udeno�̋N���I�v�V�����v�u�J�����g�f�B���N�g������̎��s�t�@�C���ւ̑���path�v
Param
(
  $CurrentFolder,
  $Deno,
  $DenoOption,
  $TS
)

cd $CurrentFolder.Trim('"')
echo ("�J�����g�f�B���N�g�� > " + $CurrentFolder)

Start-Process -FilePath $Deno -ArgumentList "run", $DenoOption, $TS -Wait
