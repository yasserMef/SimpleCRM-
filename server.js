const express = require("express")
const app = express()
const dotenv = require("dotenv")

//routers
const entrepriseRoute = require("./router/entrepriseRouter")
const productRoute = require("./router/productRouter")
const clientRoute = require("./router/clientRouter")
const factureRoute = require("./router/factureRoute")
const detaillFacture = require("./router/detailFactureRoute")

const ApiError = require("./util/apiError")

dotenv.config({path:".env"})

app.use(express.json())

app.use("/api/v1/entreprise" , entrepriseRoute)
app.use("/api/v1/product" , productRoute)
app.use("/api/v1/client" , clientRoute)
app.use("/api/v1/facture" , factureRoute)
app.use("/api/v1/detaillFacture" , detaillFacture)


app.all("*",(req,res,next)=>{
   next(new ApiError(`this ${req.originalUrl} is not exist`,400))
})

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
   res.status(err.statusCode).json({
    statusCode : err.statusCode,
    status : err.status,
    message:err.message,
    stack:err.stack
   })
})

const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log("app listen")
})






