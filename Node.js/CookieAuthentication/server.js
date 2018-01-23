var express = require('express');
var routes = require('./routes');
var app = express();
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
  if (request.signedCookies.user != 'admin') {
    response.redirect('/login.html');
  } else {
    next();
  }
});

// routes
app.post('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/admin/color', routes.getColor);
app.post('/admin/color', routes.setColor);

// serve static content
app.use('/', express.static('public'));

// redirect unknown routes to guest.html
app.use('/',
  function (request, response) {
    response.redirect('/guest.html');
  });