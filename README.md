# Angular JS Ecommerce App
![Angular JS Ecommerce App](https://cosmicjs.com/uploads/ca5cc070-4ae2-11e7-a6d3-9950c5658967-Screen%20Shot%202017-06-06%20at%201.05.28%20PM.png)

### [View a demo here](https://ecommerce-app.cosmicapp.co)

An Angular JS ecommerce app that allows you to:
1. Process orders from customers and accept Stripe payments for goods and services.
2. Manage inventory in your Cosmic JS Dashboard or in the admin area on the website.

### Get Started
[Sign up for Cosmic JS](https://cosmicjs.com/) to start managing content for your websites and applications faster and easier.

#### Building and running the server (performs a gulp command prestart):
```
npm install
COSMIC_BUCKET=your-bucket-slug READ_KEY=your-read-key WRITE_KEY=your-write-key STRIPE_KEY=your-stripe-key npm start
```
Then go to [http://localhost:3000](http://localhost:3000)

### Admin area
Go to http://localhost:3000/#/login to manage your products and orders.

### In Production
#### Deploy to Cosmic JS
[Deploy this app to Cosmic JS in a few clicks.](https://cosmicjs.com/apps/ecommerce-app)

#### Add Stripe Key
After you deploy go to Deploy Web App > Set Environment Variables to add your STRIPE_KEY environment variable.
