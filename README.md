# Angular JS Ecommerce App
##### [View a demo here](http://events.cosmicapp.co/)
[Sign up for Cosmic JS](https://cosmicjs.com/) to start managing content for your websites and applications faster and easier.
### Get Started

#### After setting up your bucket on Cosmic JS, edit the config.js file and edit the slug to point to the slug of your bucket:


```javascript
// config.js
app.constant('BUCKET_SLUG', 'your-bucket-slug');
app.constant('URL', 'https://api.cosmicjs.com/v1/');
app.constant('MEDIA_URL', 'https://api.cosmicjs.com/v1/your-bucket-slug/media');
app.constant('READ_KEY', 'read-key');
app.constant('WRITE_KEY', 'write-key');
```


#### Running server:
```
npm install
npm start
```


#### Building Ecommerce App:
```
gulp
```
Then go to [http://localhost:3000](http://localhost:3000)


