import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import config from '../../webpack.dev.config.js';
import dataEng from '../data/data-eng';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const CONTACTS_FILE = path.join(DIST_DIR, 'contacts.html');
const compiler = webpack(config);

app.set('view engine', 'pug');
app.set('views', './dist/views/pages');
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  quiet: true,
  logLevel: 'silent',
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.render('index', { ...dataEng.pages.index });
});

app.get('/contacts', (req, res, next) => {
  res.render('contacts', { ...dataEng.pages.contacts });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Press Ctrl+C to quit.`);
});
