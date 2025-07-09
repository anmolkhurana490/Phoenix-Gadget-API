import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);

        res.cookie('AuthToken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict' // Prevent CSRF attacks
        });

        res.status(200).json({ user, message: 'Login successful' });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);

        res.status(201).json({ user, message: 'Registration successful' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('AuthToken');
    res.status(200).json({ message: 'Logout successful' });
});

export default router;