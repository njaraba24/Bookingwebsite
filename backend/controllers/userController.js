import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

//api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//getting user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, dob, address, gender } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      address,
      gender
    });
    if (imageFile) {
        //upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
        const imageURL = imageUpload.secure_url;

        await userModel.findByIdAndUpdate(userId, {image: imageURL})
    }
    res.json({success:true, message:"profile updated successfully"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, DocId, docId, SlotDate, SlotTime } = req.body;
    
    // Handle both DocId and docId
    const doctorId = DocId || docId;
    
    if (!doctorId) {
      return res.json({
        success: false,
        message: "Doctor ID is required"
      });
    }

    // Check if doctor exists
    const docData = await doctorModel.findById(doctorId).select("-password");
    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found"
      });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Get fresh doctor data to ensure we have latest slots
    const freshDocData = await doctorModel.findById(doctorId);
    if (!freshDocData.slotsBooked) {
      freshDocData.slotsBooked = {};
    }

    // Check if slot is already booked
    if (freshDocData.slotsBooked[SlotDate] && freshDocData.slotsBooked[SlotDate].includes(SlotTime)) {
      return res.json({ success: false, message: "Slot already booked" });
    }

    // Add new slot
    if (!freshDocData.slotsBooked[SlotDate]) {
      freshDocData.slotsBooked[SlotDate] = [];
    }
    freshDocData.slotsBooked[SlotDate].push(SlotTime);

    const userData = await userModel.findById(userId).select("-password");

    const appointmentData = {
      userId,
      docId: doctorId,
      SlotDate,
      SlotTime,
      userData,
      docData: freshDocData,
      amount: freshDocData.fees || 0,
      date: Date.now()
    };

    // Save appointment first
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Then update doctor's slots
    await doctorModel.findByIdAndUpdate(doctorId, { slotsBooked: freshDocData.slotsBooked });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user appointment

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

//api to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const {userId, appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)
    //verify appointment user

    if (appointmentData.userId !== userId) {
      return res.json({success:false, message:"Unauthorized access"})
    }
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

// api to make payment
const mpesaPayment = async (req, res) => {
  try {
    const {appointmentId} = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId)
  
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({success:false, message:"Appointment not found"})
      
    }
  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
 
  //make payment here
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
