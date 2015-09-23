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
rm -Rf "nwjs-${ver}-osx-x64"