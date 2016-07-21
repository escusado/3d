'use strict';

let PORT = 3000;

let Koa = require('koa'),
    Serve = require('koa-serve'),
    Fs = require('fs');

let app = Koa();

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

app.use(Serve('src'));

app.use(function *(){
  this.body = Fs.readFileSync('index.html', 'utf-8');
});

app.listen(PORT);
console.log(`
  o-------o
 /|      /|
/ |     / |
o-|----o  |
| o----|--o
| /    | /
o------o

Go!
localhost:`+ PORT +`

  `);
