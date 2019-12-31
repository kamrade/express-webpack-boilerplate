import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config.js';

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
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'xPack' });
});

app.get('/contacts', (req, res, next) => {
  res.render('contacts', { title: 'Contacts' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Press Ctrl+C to quit.`);
});
