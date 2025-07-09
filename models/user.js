import { DataTypes } from "sequelize";

export const UserModel = (sequelize) => {
    return sequelize.define("Users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure emails are unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}