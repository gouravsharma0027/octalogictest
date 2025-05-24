import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  // Clear old data
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();

  // Seed vehicle types with category and wheels
  const hatchback = await prisma.vehicleType.create({ data: { name: 'Hatchback', category: 'car', wheels: 4 }});
  const suv = await prisma.vehicleType.create({ data: { name: 'SUV', category: 'car', wheels: 4 }});
  const sedan = await prisma.vehicleType.create({ data: { name: 'Sedan', category: 'car', wheels: 4 }});
  const cruiser = await prisma.vehicleType.create({ data: { name: 'Cruiser', category: 'bike', wheels: 2 }});

  // Add multiple vehicles per type
  await prisma.vehicle.createMany({
    data: [
      { name: 'Hatchback Model A', typeId: hatchback.id },
      { name: 'Hatchback Model B', typeId: hatchback.id },
      { name: 'SUV Model X', typeId: suv.id },
      { name: 'SUV Model Y', typeId: suv.id },
      { name: 'Sedan Model C', typeId: sedan.id },
      { name: 'Sedan Model D', typeId: sedan.id },
      { name: 'Cruiser Bike X', typeId: cruiser.id },
      { name: 'Cruiser Bike Z', typeId: cruiser.id }
    ]
  });

  console.log('✅ Seed data created');
}
