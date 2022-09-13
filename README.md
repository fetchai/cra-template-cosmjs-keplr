# Generating a react app from the template

Quick start:
```bash
npx create-react-app --template cosmjs-keplr <destination>
cd <destination>
yarn start  # or npm start
```

See [./template/README](./template/README.md) for more.

# Documentation

See the official docs at [docs.fetch.ai](https://docs.fetch.ai/).

# Contributing

When working on the template, building the template directory is a much faster feedback loop than generating an app from the template.
For this reason, the path `template/package.json` is included in [`.gitignore`](./.gitignore).

To build and run the template directory, copy the value of the root-level `"package"` key in [`template.json`](./template.json) to a new `template/package.json`.
Afterwards, `cd` into the `template` directory and follow the [template/README](./template/README.md) applies.
