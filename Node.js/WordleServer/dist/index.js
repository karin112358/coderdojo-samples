"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// Legt den Webserver an
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.get('/king', (req, res) => {
    res.send('<html><body><h1>kong</h1></body></html>');
});
app.get('/demo', (req, res) => {
    res.render('demo.ejs');
});
app.get('/wordle', (req, res) => {
    res.render('wordle.ejs', { wordOfTheDay: 'blume' });
});
app.post('/wordle', (req, res) => {
    console.log('body', req.body);
    let previousGuesses = req.body.previousGuesses.toLowerCase();
    if (previousGuesses) {
        previousGuesses += '_';
    }
    res.render('wordle.ejs', {
        wordOfTheDay: 'blume',
        previousGuesses: previousGuesses,
    });
});
// Startet den Webserver
app.listen('8081', () => {
    console.log('The webserver is running at http://localhost:8081');
});
//# sourceMappingURL=index.js.map