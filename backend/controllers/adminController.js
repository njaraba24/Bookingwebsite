import validator from 'validator';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ success: true, message: 'Admin logged in successfully', token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api for adding doctor
const addDoctor = async (req, res) => {
    try {
        console.log('Received request:', {
            body: req.body,
            file: req.file,
            headers: req.headers
        });

        const { name, email, password, speciality, degree, experience, about, fees, address, phone } = req.body;
        
        // Initial validations
        if (!req.file) {
            return res.json({ success: false, message: 'Image is required' });
        }

        // Validate required fields
        const requiredFields = { name, email, password, speciality, degree, experience, about, fees, address, phone };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.json({ success: false, message: `${field} is required` });
            }
        }

        // Verify cloudinary configuration
        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Cloudinary configuration missing');
            return res.json({ success: false, message: 'Server configuration error' });
        }

        let uploadResult;
        try {
            // Upload image to cloudinary
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'doctors',
                width: 150,
                crop: "scale"
            });
            console.log('Cloudinary upload successful:', uploadResult.secure_url);
        } catch (uploadError) {
            console.error('Cloudinary upload failed:', uploadError);
            // Clean up file and return error
            await fs.unlink(req.file.path).catch(console.error);
            return res.json({ 
                success: false, 
                message: 'Failed to upload image to cloud storage'
            });
        }

        // Clean up uploaded file after successful upload
        await fs.unlink(req.file.path).catch(err => {
            console.error('Error deleting file:', err);
            // Continue execution even if file deletion fails
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            // Create and save new doctor
            const newDoctor = new doctorModel({
                name,
                email,
                password: hashedPassword,
                image: uploadResult.secure_url,
                speciality,
                degree,
                experience,
                available: true,
                about,
                fees: Number(fees),
                address,
                phone,
                date: Date.now(),
                slotsBooked: {}
            });

            // Save to database
            await newDoctor.save();
            console.log('Doctor saved successfully:', newDoctor._id);
            res.json({ success: true, message: 'Doctor added successfully' });
        } catch (dbError) {
            console.error('Database save failed:', dbError);
            // Delete uploaded image from cloudinary if database save fails
            await cloudinary.uploader.destroy(uploadResult.public_id).catch(console.error);
            throw dbError; // Re-throw to be caught by outer catch block
        }

    } catch (error) {
        console.error('Error adding doctor:', error);
        
        // Clean up uploaded file if it exists and there was an error
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(console.error);
        }

        if (error.code === 11000) {
            return res.json({ success: false, message: 'Email already exists' });
        }
        
        res.json({ 
            success: false, 
            message: error.message || 'Failed to add doctor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}

//api to get all doctors list

const allDoctors = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success: true, doctors});
    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

// Api to get all appointment list

const appointmentAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

// Api for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId)
      //verify appointment user
  
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
  
      //update doctor slots
      const {docId, SlotDate, SlotTime} = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slotsBooked = docData.slotsBooked;
  
      res.json({success:true, message:"Appointment cancelled successfully"})
  
      slotsBooked[SlotDate] = slotsBooked[SlotDate].filter(slot => slot !== SlotTime);
      await doctorModel.findByIdAndUpdate(docId, {slotsBooked})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

  //api to get dashboard data

  const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        const dashData = {
            doctors: doctors.length,
            users: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success: true, dashData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
  }


export { loginAdmin, addDoctor, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard }; // Added appointmentCancel export
