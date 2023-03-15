# Offsetting Marketplace Demo
This application shows how to create a marketplace for carbon offsets powered by [Pledge API](https://docs.pledge.io).  
It is built using [NodeJs](https://nodejs.org/), [Express](https://expressjs.com/), [EJS](https://ejs.co/) and [TailwindCSS](https://tailwindcss.com/).  

## Live demo
<a href="https://marketplace.demos.pledge.io" target="_blank">Offsetting Marketplace Demo</a>

## Getting started
1. [Sign up](https://app.pledge.io/auth/sign-up)
2. Grab an [API key](https://app.pledge.io/test/developers)

## Running locally

1. Clone the repository
```
git clone https://github.com/pledge-io/marketplace-demo-app.git
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PLEDGE_API_KEY=YOUR_TEST_API_KEY
PLEDGE_API_URL=https://api.pledge.io/test/v1
PLEDGE_SERVICE_FEE=0.125
```

4. Start development server
```
npm run dev
```

5.  Open the application in your browser
```
Go to http://localhost:3000
```