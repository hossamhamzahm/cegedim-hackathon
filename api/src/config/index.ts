import dotenv from "dotenv";
import path from "path";



if (process.env.NODE_ENV !== "prod") dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
export default {
    port: process.env.PORT || 3030,
    url: process.env.URL || 'http://localhost:' + process.env.PORT,
    db_url: process.env.DB_URL || 'localhost',
    db_user: process.env.DB_USER as string,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME as string,
    db_host: process.env.DB_HOST,
    db_port: parseInt(<string>process.env.DB_PORT),
}; 