const bodyParser = require("body-parser")
const express = require("express")
const dbConnect = require("./config/dbConnect")
const app = express()
const dotenv = require("dotenv").config()

const PORT = process.env.PORT

const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")

dbConnect()

app.use(morgan("dev"))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api", require("./Routers/SuperAdminRoute"))
app.use("/api/task", require("./Routers/TaskRoute"))
app.use("/api/category", require("./Routers/CategoryRoute"))
app.use("/api/subcategory", require("./Routers/SubcategoryRoute"))


app.listen(PORT, () => {
  console.log(`Task Management Server is running at PORT ${PORT} 🥰🥰🥰`)
})  