import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dataEng from '../data/data-eng';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const CONTACTS_FILE = path.join(DIST_DIR, 'contacts.html');

app.set('view engine', 'pug');
app.set('views', './dist/views/pages');
app.use(express.static(DIST_DIR));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render('index', {title: 'xPack'});
});

app.get('/contacts', (req, res, next) => {
  res.render('contacts', {title: 'Contacts'});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Press Ctrl+C to quit.`);
});
