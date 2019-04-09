const {router, post} = require('microrouter');

module.exports = router(post('/api/v1/calc', require('./v1/calc')));
