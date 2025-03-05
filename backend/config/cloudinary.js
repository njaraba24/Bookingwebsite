import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Verify connection by attempting to get account details
        await cloudinary.api.ping();
        console.log('Cloudinary connected successfully');
    } catch (error) {
        console.error('Failed to connect to Cloudinary:', error);
        throw error; // Re-throw to be caught by server startup
    }
}

export default connectCloudinary;