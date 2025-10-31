import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.startsWith('Bearer '))
        ? authHeader.split(' ')[1] : null;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const user = await User.findById(userId);
            if (user) {
                req.user = user;
                next();
            }
            else {
                return res.status(401).json({ success: false, message: "Not authorized, user not found" });
            }
        }
        catch (error) {
            return res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
};
//# sourceMappingURL=auth.middleware.js.map