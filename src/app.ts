import express from "express"
import cors from "cors"

export const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(3002, () => {
   if (server) {
      console.log(`Server is running in http://localhost:3002`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});
