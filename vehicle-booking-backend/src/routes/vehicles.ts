import { Router } from 'express';
import { getVehiclesByWheels } from '../controllers/vehicleController.js';

const router = Router();

router.get('/', getVehiclesByWheels);

export default router;
