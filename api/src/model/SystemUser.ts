import { DataTypes, literal }  from "sequelize";
import sequelize from "./database";

const SystemUser = sequelize.define(
    'SystemUser',
    {
        username: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(35),
            unique: {
                // args: true,
                name: 'Email uniqueness constraint',
                msg: 'Email address already in use!',
            },
            validate: {
            	isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['Patient', 'Pharmacy', 'Doctor'],
        }
    },
    {
        tableName: 'SystemUser',
        underscored: true,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email'],
                using: 'BTREE',
            },
        ],
    }
);

export default SystemUser;