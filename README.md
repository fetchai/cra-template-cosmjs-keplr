# Contributing

When working on the template, building the template directory is a much faster feedback loop than generating an app from the template.
For this reason, the path `template/package.json` is included in [`.gitignore`](./.gitignore).

To build and run the template directory, copy the value of the root-level `"package"` key in [`template.json`](./template.json) to a new `template/package.json`.
Aftwerwards, `cd` into the `template` directory and follow the [template/README](./template/README.md) applies.
