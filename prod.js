const handler = require('serve-handler');
const {createServer} = require('http');
const {router, get, post} = require('microrouter');
const api = require('./api');

createServer(
  router(
    post('/api/v1/*', api.v1.calc),
    get('*', (req, res) =>
      handler(req, res, {
        public: 'dist',
      }),
    ),
  ),
).listen(3000, err => {
  if (err) {
    throw err;
  }

  console.log('> Ready on http://localhost:3000');
});
