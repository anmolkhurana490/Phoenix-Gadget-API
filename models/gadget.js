import { DataTypes } from "sequelize";

export const GadgetModel = (sequelize) => {
    return sequelize.define("Gadgets", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
            defaultValue: "Available",
        },
        decommissioned_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    })
}