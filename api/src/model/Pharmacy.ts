import { DataTypes }  from "sequelize";
import sequelize from "./database";
import SystemUser from "./SystemUser";




const Pharmacy = sequelize.define(
    'Pharmacy',
    {
        pharmID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            references: {
                model: SystemUser,
                key: 'username',
            },
        },
        name: {
            type: DataTypes.STRING(20),
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
        },
        location: {
            type: DataTypes.STRING(20)
        }
    },
    {
        tableName: 'Doctor',
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['username'],
            }
        ],
    }
);


// Define virtual functions using a separate object
// const virtualFunctions = {
//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// };

// // Attach virtual functions to the model's prototype
// Object.assign(Doctor.prototype, virtualFunctions);


Pharmacy.belongsTo(SystemUser, {
	foreignKey: "username",
	targetKey: "username",
	onDelete: "CASCADE",
});

export default Pharmacy;