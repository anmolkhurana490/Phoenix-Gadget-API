import { User } from "../config/db.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export const getUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { user, token };
}

export const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const user = await User.create({ email, password });
    return user;
}