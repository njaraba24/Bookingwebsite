import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"


const changeAvailability = async (req, res) => {
    try{

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({ success: true, message: 'Availability changed successfully' });

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-email', '-password']).lean();
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

//api for doctor login

const loginDoctor = async (req, res) => {
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false, message: 'invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)

            res.json({success:true, token})
        }else{
            res.json({success:false, message: 'invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

//api to get doctor appointments for doctor panel

const appointmentDoctor = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId})
        res.json({ success: true, appointments });   
     } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
        
    }
}

//api to make appointment completed

const appointmentComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
            res.json({ success: true, message: 'appointment completed' });
        } else {
            res.json({ success: false, message: 'Mark Failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
            res.json({ success: true, message: 'appointment cancelled' });
        } else {
            res.json({ success: false, message: 'Cancellation Failed' });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
        
    }
}

//api to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});

        let earnings = 0;

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        });

        let patients = [];

        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: [...appointments].reverse().slice(0, 5)
        }
        res.json({success:true, dashData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
    try {
        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select(['-password'])
        res.json({success:true, profileData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
        
    }
}

//api to update doctor profile data from doctor panel

const updateDoctorProfile = async (req, res) => {
    try {
        const {docId, fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});
        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
        
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile };