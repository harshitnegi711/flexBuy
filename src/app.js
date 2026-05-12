// ----------- TODO : Steps to proeceed --------- //

// Setup Express server ------- done 
// Connect MongoDB  ---------- done
// Create User model -------------- done
// Implement JWT auth
// Create Product model
// Add image upload
// Create Cart & Order APIs
// Add payment gateway


import express from "express"
import router from "./router.js"
import cors from "cors"


const app = express()

app.use(cors())

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))


app.use("/dukan/api/v1/", router)

export default app
