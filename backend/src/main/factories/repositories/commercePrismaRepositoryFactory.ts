import { CommercePrismaRepository } from '@/infra/prisma/CommercePrismaRepository';
import { prismaClient } from '@/infra/prisma/prismaClient';

export function makeCommercePrismaRepository() {
  return new CommercePrismaRepository(prismaClient);
}
