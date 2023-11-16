import { Elysia, t } from 'elysia';
import { createClientSession } from './api/createClientSession';

const app = new Elysia({ aot: true })
  .get('/', () =>
    ['Available endpoints:', '', '  POST /client-session'].join('\n'),
  )
  .post(
    '/client-session',
    (request) => {
      const { amount, currencyCode } = request.body;

      return createClientSession({
        amount,
        currencyCode,
      });
    },
    {
      body: t.Object({
        amount: t.Number(),
        currencyCode: t.String(),
      }),
      type: 'json',
    },
  )
  .listen(3000);

console.log(
  `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`,
);
