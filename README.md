# Project Instructions

This repo is the code for the project on NLP: Webpack, Webpack's loaders and plugins, 3 API calls masking our personal key through .env and making the request from my server, service workers, and Jest tests.

The goal of this project is to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve.

### Step 1: Signup for an API key
First, I got 3 the keys for the 3 APIs we are going to use:

[Geonames](http://www.geonames.org/export/web-services.html).
[Weatherbit](https://www.weatherbit.io/account/create).
[Pixabay](https://pixabay.com/api/docs/).

### Step 2: Environment Variables
Next I declared my API keys, which will look something like this:
```
const pixabayKey = process.env.pixabayKey;
const weatherKey = process.env.weatherKey;
const geoname = process.env.geoname;
});
```
- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);
```
...Not that you would want to do that. This means that our updated API credential settings will look like this:

### Step 3: Using the APIs

We send the name of a city to [Geonames](http://www.geonames.org/export/web-services.html). From it we get the latitud and longitud from that city to send to [Weatherbit](https://www.weatherbit.io/account/create). This API returns the forecast for the next 15 days. And lastly we get a relevant image from [Pixabay](https://pixabay.com/api/docs/). stock to illustrate the city.

## After the APIs

Once I hooked up to the 3 APIs, you are most of the way there! Along with making sure you are following all the requirements in the project rubric in the classroom, here are a few other steps to make sure you take.

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
- Updated the CSS to fit my needs.
- Go back to the webpack config and add the setup for service workers.
- Test that the site is now available even when you stop your local server.

## Extra functionalities

- Option to print to PDF.
- Button to clear current data.