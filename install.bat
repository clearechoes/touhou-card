REM @ECHO OFF
SET VER=0.12.2
SET DOWNLOADEDFILE=C:\Downloads\nwjs-v%VER%-win-ia32.zip

IF NOT EXIST %DOWNLOADEDFILE% (
  START /WAIT _redist\wget.exe http://dl.nwjs.io/%VER%/nwjs-v%VER%-win-ia32.zip -O %DOWNLOADEDFILE%
)
START /WAIT _redist\7zip\7za.exe e %DOWNLOADEDFILE% -y -o.\
IF NOT EXIST locales (
  mkdir locales
)

MOVE *.pak locales\
MOVE locales\nw.pak .\
COPY /Y _redist\ffmpegsumo.dll .\

START /WAIT _redist\7zip\7za.exe x _redist\node_modules.zip -y -o.\node_modules

PAUSE
