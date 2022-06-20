# Create React App Template

[Create React App](https://create-react-app.dev) is a CLI utility which facilitates
generation of react app boilerplate via templates.

In order to expedite distributed application (DApp) development, we maintain a create-react-app template: [cra-template-cosmjs-keplr](https://github.com/fetchai/cra-template-cosmjs-keplr).
Projects generated from this template include all the necessary dependencies and build configuration needed to:

- Interact with the Fetch or Keplr wallet
    - [fetchai/fetch-wallet (github)](https://github.com/fetchai/fetch-wallet/blob/master/packages/provider/src/core.ts#L43)
- Interact with cosmos-based networks
    - [@cosmjs/stargate (npm)](https://www.npmjs.com/package/@cosmjs/stargate)
    - [@cosmjs/cosmwasm-stargate (npm)](https://www.npmjs.com/package/@cosmjs/cosmwasm-stargate)


---

To generate a new project:

```
npx create-react-app --template cosmjs-keplr
```

The generated project also comes with an [example DApp](./example_dapp), "Hello Cosmos", which demonstrates Cosmjs and Keplr API usage in the form of a simple frontend.
