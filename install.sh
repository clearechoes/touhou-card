#!/bin/bash

ver=v0.12.2

if ! [ -d "_redist" ]; then
  mkdir "_redist"
fi

if ! [ -f "_redist/nwjs-${ver}-osx-x64.zip" ]; then
  wget "http://dl.nwjs.io/${ver}/nwjs-${ver}-osx-x64.zip" -O "_redist/nwjs-${ver}-osx-x64.zip"
fi
unzip -o "_redist/nwjs-${ver}-osx-x64.zip"

if [ -d "nwjs.app" ]; then
  rm -Rf nwjs.app
fi

mv "nwjs-${ver}-osx-x64/nwjs.app" ./
cp "_redist/ffmpegsumo.so" "nwjs.app/Contents/Frameworks/nwjs Framework.framework/Libraries/ffmpegsumo.so"
rm -Rf "nwjs-${ver}-osx-x64"