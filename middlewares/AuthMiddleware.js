import { verifyToken, getUser } from '../controllers/authController.js';

const middleware = async (req, res, next) => {
    try {
        const token = req.cookies.AuthToken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = verifyToken(token);
        const user = await getUser(decoded.id);

        req.user = user.dataValues; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        // console.error('Authentication error:', error);
        return res.status(500).json({ message: error.message });
    }
};

export default middleware;