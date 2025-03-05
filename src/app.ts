import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

export const app = Fastify();

export const prisma = new PrismaClient();
