import { connection } from "./connection"

/*
Executar criação de tabelas com comando "npm run migrations"
Para funcionar o arquivo .env precisa estar configurado:

DB_HOST = "Inserir aqui"
DB_USER = "Inserir aqui"
DB_PASSWORD = "Inserir aqui"
DB_SCHEMA = "Inserir aqui"

*/

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE IF NOT EXISTS institutions (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(255) NOT NULL,
         zip VARCHAR(255) NOT NULL,
         city VARCHAR(255) NOT NULL,
         state VARCHAR(255) NOT NULL,
         street_address VARCHAR(255) NOT NULL,
         number VARCHAR(255) NOT NULL,
         complement VARCHAR(255) NOT NULL,
         neighborhood VARCHAR(255) NOT NULL,
         device_count INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS devices (
         id VARCHAR(255) PRIMARY KEY,
         institution_id VARCHAR(255) NOT NULL,
         type_device VARCHAR(255) NOT NULL,
         condition_device VARCHAR(255) NOT NULL,
         FOREIGN KEY(institution_id) REFERENCES institutions(id)
      );

`)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .finally(closeConnection)

