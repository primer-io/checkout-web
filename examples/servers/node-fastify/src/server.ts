import 'dotenv/config';
import fastify from 'fastify';
import { createClientSession } from './api/createClientSession';

const app = fastify();

app.get('/', () =>
  ['Available endpoints:', '', '  POST /client-session'].join('\n'),
);

app.post('/client-session', (request) => {
  const { amount, currencyCode } = request.body as {
    amount: number;
    currencyCode: string;
  };

  return createClientSession({
    amount,
    currencyCode,
  });
});

const port = 3000;

try {
  await app.listen({ port });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

console.log('🚀 Server running on', `http://localhost:${port}`);
