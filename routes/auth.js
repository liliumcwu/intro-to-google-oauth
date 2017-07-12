const express = require('express'),
      request = require('request'),
      router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const scope = 'https://www.googleapis.com/auth/userinfo.profile';
const STATE = process.env.STATE;

router.get('/login', (req, res, next) => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirect_uri = 'http://127.0.0.1:3000/auth/authorize';
  const params = `client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${STATE}`;
  res.redirect(`${url}?${params}`);
});

router.get('/authorize', (req, res) => {
  const code = req.query.code;
  console.log('code is', code);
  const redirect_uri = 'http://127.0.0.1:3000/auth/authorize';

  const url = 'https://www.googleapis.com/oauth2/v4/token';
  var options = {
    form: {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }
  };

  console.log(options);

  request.post(url, options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log('response', response);
      // console.log('Server responded with', body); // Print the response status code if a response was received
      console.log('JSON.parse(body).access_token is', JSON.parse(body).access_token);
      // console.log('token is', token);
      // console.log('body.token_type is', body.token_type);
      req.session.access_token = JSON.parse(body).access_token;
      // res.send(req.session.access_token);
      res.redirect('/profile');
    }
    else {
      console.log('There was an error');
      // console.log('Response was', response);
      // console.log('Error was', error);
      // console.log('response.statusCode', response.statusCode);
      console.log('body was', body);
      res.send('hey');
    }
  });
});

module.exports = router;
