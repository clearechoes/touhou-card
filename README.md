# nw-angular
a working NW.js (a.k.a node-webkit) template for angularJS
(currently for OSX only)

# How to : OSX
1. Clone this repo.
2. Run `./install.sh` from terminal, inside this repo.
3. Run `npm install && bower install`
3. Open nwjs.app and you're good to go.

# How to : Windows
1. Clone this repo.
2. Run `install.bat`
3. Open nwjs.exe and you're good to go.

# Structure
I hate having to import every single JS into index.html, so I used RequireJS
- Controllers are located inside app/controllers/, you can start by duplicating application_controller.js 
- Services -- app/services, sample: test_service.js
- Factories -- app/factories, filename must be: <name>_factory.js
- Directives -- app/directives, filename must be: <name>_directive.js
- Filters -- inside app/config/filters.js
- Values -- inside app/config/values.js

# Issues
Let me know if you run into any issue while installing/using this tempate. I will try my best to help.
