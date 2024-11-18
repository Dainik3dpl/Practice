
// Register the service worker
export function register() {
    // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Register the service worker
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registered: ', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed: ', error);
          });
      });
    }
//   }
  
  // Unregister the service worker
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Service Worker unregistration failed: ', error);
        });
    }
  }