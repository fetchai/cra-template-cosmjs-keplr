# Getting started

```bash
npx create-react-app --template cosmjs-keplr <destination>
cd <destination>
yarn start  # or npm start
```

### "Hello Cosmos"

Projects generated from this template include an [example DApp](https://docs.fetch.ai/create-react-app/example_dapp) which demonstrates Cosmjs and Keplr API usage in the form of a simple frontend.

| Example feature                           | Interaction type        |
|-------------------------------------------|-------------------------|
| Print greetings submitted by other users  | CosmWasm contract query |
| Connect with Fetch wallet                 | Keplr / Fetch wallet    |
| Submit greeting                           | CosmWasm contract call  |
| Print address                             | native query            |
| Print balance                             | native query            |
| Tip other users                           | native token transfer   |

### Project structure

```
/src/example
├── api               | CosmWasm contract execution
│   ├── exec.ts
│   └── greetings.ts
├── components        | React components
│   └── ...
├── config.ts         | Network & contract configuration
├── hooks             | React hooks
│   ├── context.ts
│   ├── contract.ts
│   ├── cosmjs.ts
│   └── keplr.ts
├── signers            | Signer APIs
│   └── keplr
├── utils.ts
└── ...
```

# Removing the example

The example app is almost entirely contained in the `src/example` directory.
To remove the example:

- Delete the [src/example](./src/example) directory
- Remove the `@import` from [src/index.css](./src/index.css)
- Remove these lines from [public/index.html](./public/index.html):
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              inter: [ "Inter", "Sans-Serif" ],
            },
          }
        }
      }
    </script>
    ```

# About Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
