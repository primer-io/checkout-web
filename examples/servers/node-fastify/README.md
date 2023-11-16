# Server Node Fastify

In this example we build a server to integrate with Primer's API.

It uses [Node](https://nodejs.org) as the runtime and [Fastify](https://fastify.dev) as the HTTP server framework, but feel free to build your server however you'd like.

## Running on your browser

[Click here to immediately launch it on your browser](https://stackblitz.com/github/primer-io/checkout-web/tree/main/examples/server-node-fastify).

Once it's open, make sure to:

1. Create a new file `.env` and copy contents from `.env.example` into it
2. Get an `API_KEY` from your Primer Dashboard and paste it there
   - Example: `API_KEY=1234-foo-bar-4321`

## Running locally

1. Install [Node](https://nodejs.org)
   - Recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions
   - If you choose to use it, after installing simply run:
   ```sh
   nvm i && nvm use
   ```
2. Run `npm i` on a terminal
3. Follow the same instructions described on the section above about the `API_KEY`
4. Execute the following script on a terminal window:
   ```sh
   npm start
   ```
