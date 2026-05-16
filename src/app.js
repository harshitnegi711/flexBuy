// ----------- TODO : Steps to proeceed --------- //

// Setup Express server ------- done 
// Connect MongoDB  ---------- done
// Create User model -------------- done
// file upload ----------------- done
// Implement JWT auth ----------------- done
// Create Product model -------------- done
// Add image upload --------------- done
// Create Cart & Order APIs
// Add payment gateway


import express from "express"
import router from "./router.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors())

app.use(cookieParser())
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))


app.use("/flexbuy/api/v1/", router)

export default app
