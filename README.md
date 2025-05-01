## Development

This explorable uses nodejs + nextjs.

The easiest way to get started is to use the [Devenv](https://devenv.sh) config
files included in the project. You can get up and running almost instantly on
Github by using [Codespaces](https://github.com/features/codespaces).

### Code Space

- Click the Code button, wait for install
- run `yarn dev`
- You're up and running!

### Local Install

You will need

- node
- a node version compatiable with the one in `.nvmrc`
- yarn

To get started with this project:

- git clone `git@github.com:nicolecomputer/brilliant-optics-explorable.git`
- `cd brilliant-optics-explorable`
- `yarn install`
- `yarn dev`

## Deployment

This explorable deploys as a static site and is hosted on
[Cloudflare Pages](https://pages.cloudflare.com).

The domain,
[brilliant-optics-explorable.nicole.computer](https://brilliant-optics-explorable.nicole.computer/)
is hosted at [Hover](http://hover.com) with a CNAME record pointing to
brilliant-optics-explorable.pages.dev
