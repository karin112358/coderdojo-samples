var loki = require('lokijs');

var db = new loki('chat-db.json', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

exports.login = function (request, response) {
    if (isUserValid(request.body.username, request.body.password)) {
        response.cookie('user', request.body.username, { signed: true });
        response.sendStatus(200);
    } else {
        response.sendStatus(401);
    }
};

exports.logout = function (request, response) {
    response.clearCookie('user');
    response.redirect('/');
};

exports.getColor = function (request, response) {
    var user = db.getCollection('users').findOne({ username: request.signedCookies.user });
    if (!user) {
        response.sendStatus(403);
    } else {
        response.json({ color: user.color });
    }
}

exports.setColor = function (request, response) {
    var user = db.getCollection('users').findOne({ username: request.signedCookies.user });
    if (!user) {
        response.sendStatus(403);
    } else if (!request.body.color) {
        response.sendStatus(400);
    } else {
        user.color = request.body.color;
        db.getCollection('users').update(user);
        response.sendStatus(204);
    }
}

function isUserValid(username, password) {
    var users = db.getCollection('users');
    return users.findOne({ username: username, password: password });
}

function databaseInitialize() {
    if (!db.getCollection('users')) {
        users = db.addCollection('users');
        users.insert({
            username: 'admin',
            password: 'admin'
        });
    }
}