@ECHO OFF
SET VER=0.12.2
IF NOT EXIST C:\Downloads (
  mkdir C:\Downloads
)
SET DOWNLOADEDFILE=C:\Downloads\nwjs-v%VER%-win-ia32.zip
SET DOWNLOADLINK=http://dl.nwjs.io/v%VER%/nwjs-v%VER%-win-ia32.zip
IF NOT EXIST %DOWNLOADEDFILE% (
  ECHO "Downloading NW.js Package..."
  START /WAIT /MIN _redist\wget.exe %DOWNLOADLINK% -O %DOWNLOADEDFILE%
)
ECHO "Extracting NW.js..."
START /WAIT /MIN _redist\7zip\7za.exe e %DOWNLOADEDFILE% -y -o.\
IF NOT EXIST locales (
  mkdir locales
)

MOVE *.pak locales\
MOVE locales\nw.pak .\
COPY /Y _redist\ffmpegsumo.dll .\

ECHO "Extracting node_modules..."
START /WAIT /MIN _redist\7zip\7za.exe x _redist\node_modules.zip -y -o.\node_modules

PAUSE
