import { Router } from 'express';
import vehicleRoutes from './vehicles.js';
import bookingRoutes from './bookings.js';

const router = Router();

router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingRoutes);

export default router;
