import { DataTypes }  from "sequelize";
import sequelize from "./database";
import SystemUser from "./SystemUser";




const Doctor = sequelize.define(
    'Doctor',
    {
        did: {
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
        firstName: {
            type: DataTypes.STRING(20),
        },
        lastName: {
            type: DataTypes.STRING(20)
        },
        specialization: {
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


Doctor.belongsTo(SystemUser, {
	foreignKey: "username",
	targetKey: "username",
	onDelete: "CASCADE",
});

export default Doctor;