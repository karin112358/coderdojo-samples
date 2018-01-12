var express = require('express')
var app = express()
var server = require('http').createServer(app);
var cookieParser = require('cookie-parser');

// start the web server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Webserver läuft und hört auf Port %d', port);
});

app.use(express.json());
app.use(cookieParser('mySuperCookieParserSecret'));

// check cookies in admin routes
app.all('/admin/*', function (request, response, next) {
  // check authentication cookie
  console.log(request.signedCookies);
  if (request.signedCookies.user != 'admin') {
    response.redirect('/login.html');
  } else {
    next();
  }
});

// ROUTES

// login
app.post('/login', function (request, response) {
  if (request.body.username == 'admin' && request.body.password == 'admin') {
    response.cookie('user', request.body.username, { signed: true });
    response.sendStatus(200);
  } else {
    response.sendStatus(401);
  }
});

// logout
app.get('/logout', (request, response) => {
  response.clearCookie('user');
  response.redirect('/');
});

// serve static content
app.use('/', express.static('public'));

// redirect unknown routes to guest.html
app.use('/',
  function (request, response) {
    response.redirect('/guest.html');
  });