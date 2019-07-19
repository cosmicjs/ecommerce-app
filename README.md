# Angular JS Ecommerce App
![Angular JS Ecommerce App](https://cosmicjs.com/uploads/ca5cc070-4ae2-11e7-a6d3-9950c5658967-Screen%20Shot%202017-06-06%20at%201.05.28%20PM.png)
<img align="right" width="119" src="https://ecommerce-app.cosmicapp.co/dist/img/powered_by_stripe@2x.png">

### [View a demo here](https://cosmicjs.com/apps/ecommerce-app)

An Angular JS ecommerce app that allows you to:
1. Process orders from customers and accept Stripe payments for goods and services.
2. Manage inventory in your Cosmic JS Dashboard or in the admin area on the website.

### Get Started
[Sign up for Cosmic JS](https://cosmicjs.com/) to start managing content for your websites and applications faster and easier.

#### Building and running the server (performs a gulp command prestart):
```
git clone https://github.com/cosmicjs/ecommerce-app
cd ecommerce-app
npm install
COSMIC_BUCKET=your-bucket-slug READ_KEY=your-read-key WRITE_KEY=your-write-key STRIPE_KEY=your-public-key STRIPE_SECRET=your-private-key npm start
```
Then go to [http://localhost:3000](http://localhost:3000)

### Admin area
Go to http://localhost:3000/#/login to manage your products and orders.

### In Production
#### Deploy to Now or Heroku
Deplow to Now from the root folder:
```
now
```
More information can be found on the [Now website](https://zeit.co/now).

Deplow to Heroku from the root folder:
```
heroku create
gitpush heroku master
```
More information can be found on the [Heroku website](https://devcenter.heroku.com/articles/deploying-nodejs).
#### Add Stripe Keys
After you deploy go to the resective area in either service to add your `STRIPE_KEY` and `STRIPE_SECRET` environment variables.
