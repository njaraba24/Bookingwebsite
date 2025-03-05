import jwt from 'jsonwebtoken';

// admin authentification

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({ success:false, message: 'Access Denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;
       

        next()
    }catch (error) {
        console.log(error)
        res.json({ success:false, message: error.message });
    }
}

export default authUser;