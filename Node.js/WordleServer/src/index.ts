import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

// Legt den Webserver an
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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
