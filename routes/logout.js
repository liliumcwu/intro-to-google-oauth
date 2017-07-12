var express = require('express'),
    request = require('request'),
    router = express.Router();

router.get('/', (req, res) => {
  console.log('hullooo');
    req.session.destroy(function(err) {
      if (err) throw (err);
      res.redirect('/');
    });
});

module.exports = router;
