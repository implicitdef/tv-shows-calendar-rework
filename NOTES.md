### How to work locally

`npm run server:run-w` in a tab

`npm run server:compile-w` in the other

### How to deploy to heroku

Just push to master

### How is the deployement wired up ?

* Domain name www.implicitdef.com is on Namecheap
* In Namecheap settings, we're hitting on Cloudflare's DNS
* In Cloudflare's settings, www.implicitdef.com/tv-shows-calendar is redirected to https://tv-shows-calendar.herokuapp.com/
* https://tv-shows-calendar.herokuapp.com/ is a Heroku app, which has Github integration with this repo, with automatic deployments activated if a push is done on master
* Heroku executes the script 'heroku-postbuild' in package.json (by convention), then 'heroku-run' (because of the Procfile). Both with NODE_ENV=production, by convention.
