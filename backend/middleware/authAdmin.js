import jwt from 'jsonwebtoken';

// admin authentification

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;
        if (!atoken) {
            return res.json({ success:false, message: 'Access Denied' });
        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success:false, message: 'Invalid token' });
        }

        next()
    }catch (error) {
        console.log(error)
        res.json({ success:false, message: error.message });
    }
}

export default authAdmin;