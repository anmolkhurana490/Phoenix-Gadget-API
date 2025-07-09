import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { GadgetModel } from '../models/gadget.js';
import { UserModel } from '../models/user.js';

config({ quiet: true });

// console.log('db.js is executing');
// // This will only print once

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Disable logging
})

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

export const Gadget = GadgetModel(sequelize);
export const User = UserModel(sequelize);