import dotenv from "dotenv"
dotenv.config({ quiet: true })

import ConnectDb from "./db/ConnectDB.js"
import app from "./app.js"


const port = process.env.PORT

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log("App is listining at port ", port)
  })
}).catch(error => console.log("error at listining on port ", error))
