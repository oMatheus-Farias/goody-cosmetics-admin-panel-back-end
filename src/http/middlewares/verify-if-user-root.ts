import type { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyIfUserRoot(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { role } = (await request.jwtVerify()) as { role: string };
    if (role !== 'ROOT') {
      return reply.status(403).send({ error: 'Forbidden' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
  }
}
