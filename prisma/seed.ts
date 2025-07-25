import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Incident data
  const baseIncidents = [
    {
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-20T08:15:00Z'),
      tsEnd: new Date('2025-07-20T08:20:00Z'),
      resolved: false,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-20T09:05:00Z'),
      tsEnd: new Date('2025-07-20T09:10:00Z'),
      resolved: true,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-20T10:30:00Z'),
      tsEnd: null,
      resolved: false,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-20T12:00:00Z'),
      tsEnd: new Date('2025-07-20T12:05:00Z'),
      resolved: true,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-20T13:15:00Z'),
      tsEnd: new Date('2025-07-20T13:20:00Z'),
      resolved: false,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-20T14:00:00Z'),
      tsEnd: null,
      resolved: true,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-20T15:45:00Z'),
      tsEnd: new Date('2025-07-20T15:50:00Z'),
      resolved: false,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-20T17:30:00Z'),
      tsEnd: new Date('2025-07-20T17:35:00Z'),
      resolved: true,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-20T18:10:00Z'),
      tsEnd: null,
      resolved: false,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-20T19:25:00Z'),
      tsEnd: new Date('2025-07-20T19:30:00Z'),
      resolved: true,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date('2025-07-20T21:00:00Z'),
      tsEnd: new Date('2025-07-20T21:05:00Z'),
      resolved: false,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date('2025-07-20T23:45:00Z'),
      tsEnd: null,
      resolved: true,
    },
  ];

  // Camera image pool
  const cameraImages = [
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  ];

  // Create 3 cameras per incident
  let cameraCount = 1;
  for (let i = 0; i < baseIncidents.length; i++) {
    for (let j = 0; j < 3; j++) {
      const cam = await prisma.camera.create({
        data: {
          name: `Camera ${cameraCount}`,
          location: `Location ${cameraCount}`,
        },
      });
      await prisma.incident.create({
        data: {
          ...baseIncidents[i],
          thumbnailUrl: cameraImages[j % cameraImages.length],
          cameraId: cam.id,
        },
      });
      cameraCount++;
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
