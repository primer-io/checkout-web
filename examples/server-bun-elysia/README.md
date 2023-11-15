# Server Bun Elysia

In this example we build a server to integrate with Primer's API.

It uses [Bun](https://bun.sh) as the runtime and [Elysia](https://elysiajs.com/) as the HTTP server framework, but feel free to build your server however you'd like.

## Running on your browser

[Click here to immediately launch it on your browser](https://stackblitz.com/github/primer-io/checkout-web/tree/main/examples/server-bun-elysia).

Once it's open, make sure to:

1. Create a new file `.env` and copy contents from `.env.example` into it
2. Get an `API_KEY` from your Primer Dashboard and paste it there
   - Example: `API_KEY=1234-foo-bar-4321`

## Running locally

1. Install [Bun](https://bun.sh)
2. Run `bun i` on a terminal
3. Follow the same instructions described on the section above about the `API_KEY`
4. Execute the following script on a terminal window:
   ```sh
   bun start
   ```
