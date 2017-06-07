
// app-server.js
var express = require('express');
var bodyParser = require('body-parser');
var stripe = require("stripe")(process.env.STRIPE_SECRET);
var app = express();
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname))
app.use(bodyParser.json())
var http = require('http').Server(app)
// Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
app.post('/charge', (req, res) => {
  var token = req.body.stripeToken;
  // Charge the user's card:
  var charge = stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    description: req.body.amount.description,
    metadata: req.body.order,
    source: token,
  }, function(err, charge) {
      res.send(charge);
  });
});
http.listen(app.get('port'), () => {
  console.log('Ecommerce App listening on ' + app.get('port'))
})