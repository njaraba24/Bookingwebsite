import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z\s.]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters, spaces, and dots are allowed.`
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Basic URL validation for cloudinary URLs
                return v.startsWith('http') && v.includes('cloudinary.com');
            },
            message: props => `${props.value} is not a valid cloudinary URL!`
        }
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true,
        min: [0, 'Fees cannot be negative'],
        max: [100000, 'Fees cannot exceed 100000'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: props => `${props.value} is not a valid fee amount! Must be a whole number.`
        }
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slotsBooked: {
        type: Object,
        default: {},
        select: true // Ensure this field is always included in queries
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Basic phone number validation (allows +, spaces, and 10-15 digits)
                return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
},{minimize: false});

const doctorModel = mongoose.models.doctor || mongoose.model("doctors", doctorSchema);

export default doctorModel;