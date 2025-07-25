import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create Cameras
  const camera1 = await prisma.camera.create({
    data: {
      name: 'Main Entrance',
      location: 'Building A - Entrance',
    },
  });

  const camera2 = await prisma.camera.create({
    data: {
      name: 'Parking Lot',
      location: 'Building A - Parking',
    },
  });

  // Create Incidents for camera1
  await prisma.incident.create({
    data: {
      type: 'Unauthorized Access',
      tsStart: new Date('2025-07-20T10:00:00Z'),
      tsEnd: new Date('2025-07-20T10:05:00Z'),
      thumbnailUrl: 'https://example.com/thumb1.jpg',
      resolved: false,
      cameraId: camera1.id,
    },
  });

  // Create Incidents for camera2
  await prisma.incident.create({
    data: {
      type: 'Suspicious Activity',
      tsStart: new Date('2025-07-21T15:30:00Z'),
      tsEnd: null,
      thumbnailUrl: 'https://example.com/thumb2.jpg',
      resolved: false,
      cameraId: camera2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
