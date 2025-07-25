import { NextRequest } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').slice(-2)[0];
  try {
    const incident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });
    return Response.json(incident);
  } catch (error) {
    return Response.json({ error: 'Incident not found' }, { status: 404 });
  }
}
