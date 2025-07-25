import { NextRequest } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved');
  console.log("the page is called")
  const resolvedBool = resolved === 'true';
  const incidents = await prisma.incident.findMany({
    where: { resolved: resolvedBool },
    orderBy: { tsStart: 'desc' },
  });
  return Response.json(incidents);
}
