import config from '../config';
import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    dialect: 'mysql',
    storage: config.db_host,
    host: config.db_host,
    port: config.db_port,
    logging: true,
    // dialectOptions: {
    // 	// useUTC: false, //for reading from database
    // 	dateStrings: true,
    // 	typeCast: true,
    // timezone: "+03:00",
    // },
    // timezone: "+03:00", //for writing to database
});


export default sequelize;