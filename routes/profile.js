const express = require('express'),
      router = express.Router(),
      request = require('request');

router.get('/', (req, res) => {
  if (!req.session.access_token) {
    console.log('There was no access token');
    return res.redirect('/');
  }
  const url = 'https://www.googleapis.com/auth/userinfo.profile';
  console.log('req.session.access_token in profile is', req.session.access_token);
  var options = {
    form: {
      'Authorization': `Bearer ${req.session.access_token}`
    }
  };

  request.get(url, options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log('response', response);
      console.log('yusss!');
      // console.log('Server responded with', body); // Print the response status code if a response was received
      // var login = JSON.parse(body).login;
      res.render('profile', JSON.parse(body));
    }
    else {
      console.log('There was an error in profile');
      // console.log('Response was', response);
      console.log('Error was', error);
      console.log('response.statusCode', response.statusCode);
      res.redirect('/');
    }
  });
});

module.exports = router;
