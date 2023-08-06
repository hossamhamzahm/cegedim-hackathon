import { DataTypes }  from "sequelize";
import sequelize from "./database";
import Doctor from "./Doctor";
import Pharmacy from "./Pharmacy";
import Patient from "../model/Patient";




const PharmacyRequest = sequelize.define(
    'PharmacyRequest',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pharm_username: {
            type: DataTypes.STRING(20),
            references: {
                model: Pharmacy,
                key: 'username',
            },
            unique: false
        },
        doctor_username: {
            type: DataTypes.STRING(20),
            references: {
                model: Doctor,
                key: 'username',
            },
            unique: false
        },
        patient_username: {
            type: DataTypes.STRING(20),
            references: {
                model: Patient,
                key: 'username',
            },
            unique: false
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        message: {
            type: DataTypes.STRING(200)
        },
        diagnosis: {
            type: DataTypes.STRING(100)
        },
        pharmacyName: {
            type: DataTypes.STRING(100)
        }
        
    },
    {
        tableName: 'PharmacyRequest',
        underscored: true,
        timestamps: false,

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


PharmacyRequest.belongsTo(Pharmacy, {
	foreignKey: "pharmacy_username",
	targetKey: "username",
	onDelete: "CASCADE",
});

PharmacyRequest.belongsTo(Doctor, {
	foreignKey: "doctor_username",
	targetKey: "username",
	onDelete: "CASCADE",
});


PharmacyRequest.belongsTo(Patient, {
	foreignKey: "patient_username",
	targetKey: "username",
	onDelete: "CASCADE",
});

export default PharmacyRequest;