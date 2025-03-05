import express from 'express';
import { addDoctor, allDoctors, loginAdmin, appointmentAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'; // Fixed import statement
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/all-doctors', authAdmin, allDoctors);
router.post('/change-availability', authAdmin, changeAvailability);
router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.get('/appointments', authAdmin, appointmentAdmin);
router.post('/cancel-appointment', authAdmin, appointmentCancel);
router.get('/dashboard', authAdmin, adminDashboard); // Added dashboard route
 // Added appointment-cancel route

export default router;
