REM cmd.exe�ł�UNC Path���J�����g�f�B���N�g���ɂł��Ȃ��B
REM deno�̓}���`�o�C�g�������܂�Path���R�}���h���C�������Ƃ��Ď󂯎��Ȃ�(URI�G���R�[�h���ꂽ������ɂȂ����Ⴄ)
REM ��L���R�ɂ��A���̃o�b�`�t�@�C����UNC Path��ł͎g�p�ł��Ȃ��B

REM powershell�Ȃ�UNC Path���J�����g�f�B���N�g���ɂł���B
REM ������ps1�t�@�C�������s�ł���悤�ɂ��邽�߂ɂ͗\�ߐݒ肪�K�v�B
REM �ݒ薳����powershell�𗘗p���邽�߂Ƀo�b�`�t�@�C�����o�R����powershell���g�p����B

powershell -ExecutionPolicy Bypass -file "%~dp0ps1.ps1" -CurrentFolder """"%~dp0"" -Deno "C:\deno\1.14.1\deno" -DenoOption "--allow-net --allow-run --allow-read --allow-write" -TS "main.ts"
pause
