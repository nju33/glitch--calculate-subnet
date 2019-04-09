const {createServer} = require('http');
const {router, get, post} = require('microrouter');
const proxy = require('http-proxy-middleware');

createServer(
  router(
    post(
      '/api/v1/*',
      proxy({
        target: 'http://localhost:3313',
        crossOrigin: true,
      }),
    ),
    get(
      '*',
      proxy({
        target: 'http://localhost:3323',
        crossOrigin: true,
      }),
    ),
  ),
).listen(3333, err => {
  if (err) {
    throw err;
  }

  console.log('> Ready on http://localhost:3333');
});
