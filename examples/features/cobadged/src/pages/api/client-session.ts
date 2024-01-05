import type { APIRoute } from 'astro';
import { createClientSession } from '../../api/createClientSession';

export const POST: APIRoute = async () => {
  const clientSession = await createClientSession();

  return new Response(JSON.stringify(clientSession));
};
