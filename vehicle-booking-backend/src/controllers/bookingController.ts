import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response) => {
  const { vehicleId, firstName, lastName, startDate, endDate } = req.body;

  if (!vehicleId || !firstName || !lastName || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: 'Vehicle already booked during this date range',
      });
    }

    const booking = await prisma.booking.create({
      data: {
        vehicleId,
        firstName,
        lastName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
