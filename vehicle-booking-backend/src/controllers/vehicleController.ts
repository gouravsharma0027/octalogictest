import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getVehiclesByWheels(req: Request, res: Response) {
  const wheel = parseInt(req.query.wheel as string);

  if (![2, 4].includes(wheel)) {
    return res.status(400).json({ error: 'Wheel must be 2 or 4' });
  }

  try {
    const types = await prisma.vehicleType.findMany({
      where: { wheels: wheel },
      include: { vehicles: true }
    });

    res.json(types);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
