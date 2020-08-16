const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  const api = [
      { path: '/', children: [] },
      { path: '/product', children: [
          { path: '/', method: 'GET', children: [] },
          { path: '/', method: 'POST', children: [] },
          { path: '/', method: 'GET', parameters: ['productId'], children: [] },
          { path: '/', method: 'PATCH', parameters: ['productId'], children: [] },
          { path: '/', method: 'DELETE', parameters: ['productId'], children: [] }
      ] },
      { path: '/order', children: [
        { path: '/', method: 'GET', children: [] },
        { path: '/', method: 'POST', children: [] },
        { path: '/', method: 'GET', parameters: ['orderId'], children: [] },
        { path: '/', method: 'DELETE', parameters: ['productId'], children: [] }
      ] },
  ];
  res.status(200).json(api);
});

module.exports = router;
