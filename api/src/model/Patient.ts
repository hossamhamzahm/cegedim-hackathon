import { DataTypes }  from "sequelize";
import sequelize from "./database";
import SystemUser from "./SystemUser";



const Patient = sequelize.define(
    'Patient',
    {
        pid: {
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
            type: DataTypes.STRING(20)
        },
        lastName: {
            type: DataTypes.STRING(20)
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        // age: {
        //     type:  DataTypes.VIRTUAL,
        //     get(): string {
        //         return `${this.firstName} ${this.lastName}`;
        //     },
        // },
        gender: {
            type: DataTypes.ENUM,
            values: ['male', 'female'],
        },
        // Virtual attribute for the full name
        phoneNumber: {
            type: DataTypes.BIGINT,
            validate: {
                isBetween: function (phoneNumber: number) {
                    if (1000000000 < phoneNumber || phoneNumber <= 1999999999) {
                        throw new Error('Value must be between a valid phone number between 01000000000 and 01999999999');
                    }
                }
            }
        },
        address: {
            type: DataTypes.STRING(20),
        },
        diagnosis: {
            type: DataTypes.STRING(100),
            defaultValue: false,
        },
    },
    {
        tableName: 'Patient',
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
//   getFullName(): string {
//     return `${this.firstName} ${this.lastName}`;
//   },

//   getAge(): String {
//     const ageInYears = (new Date()).getTime() - this.dateOfBirth.getTime() / (365 * 24 * 60 * 60 * 1000);
//     return `${Math.floor(ageInYears)}`;
//   }
// };

// // Attach virtual functions to the model's prototype
// Object.assign(Patient.prototype, virtualFunctions);


Patient.belongsTo(SystemUser, {
	foreignKey: "username",
	targetKey: "username",
	onDelete: "CASCADE",
});

export default Patient;