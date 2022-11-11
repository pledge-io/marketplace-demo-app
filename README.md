# Offsetting Marketplace Demo
This application shows how to create a marketplace for carbon offsets powered by [Pledge API](https://docs.pledge.io).  
It is built using [NodeJs](https://nodejs.org/), [Express](https://expressjs.com/), [EJS](https://ejs.co/) and [TailwindCSS](https://tailwindcss.com/).  

## Live demo
<a href="https://marketplace.demos.sandbox.pledge.dev" target="_blank">Offsetting Marketplace Demo</a>

## How to run locally

1. Clone the repository
```
git clone https://github.com/stripe-samples/connect-onboarding-for-standard.git
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PLEDGE_API_KEY=TEST|LIVE API KEY
PLEDGE_API_URL=TEST|LIVE URL
```

Test API URL (uses test data): https://api.pledge.io/test/v1.  
Live API URL (uses production data): https://api.pledge.io/v1.  


4. Start development server
```
npm run dev
```
