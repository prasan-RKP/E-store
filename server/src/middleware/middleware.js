import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel.js';

dotenv.config();


export const protectedRoute = async(req, res, next) => {

    try {
        const token = req.cookies.jwt;

    if(!token) return res.status(400).json({message: "unAuthrized User 1.."});

    const decodedUser = jwt.verify(token,process.env.JWT_SECRET);
    if(!decodedUser) return res.status(400).json({message: "unAuthrized User 2.."});

    const orgUser = await User.findById(decodedUser.userId).select("-password");
    if(!orgUser) return res.status(400).json({message: 'Invalid User'});

    req.user = orgUser;
    next();
    } catch (error) {
          return res.status(404).json({message: "Internal Server Error"});
    }
    
}