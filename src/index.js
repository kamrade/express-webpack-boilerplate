import logMessage from './js/logger';
import registerServiceWorker from './js/register-service-worker';
import './css/style.scss';

logMessage('Welcome to xPack!');

if (typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef
}

registerServiceWorker();
