export default function registerServiceWorker() {

  // check SW are supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {

      navigator.serviceWorker
        .register('/sw_cached_pages.js')
        .then(reg => console.log('::: service worker: registered'))
        .catch(err => console.error(`Service worker Error: ${err}`));

    });
  }
}
