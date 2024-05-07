const {check} = require("express-validator")
const {PrismaClient} = require("@prisma/client")
const validatorMiddleware= require("../../middlewares/validatorMiddleware")
const prisma = new PrismaClient()

exports.createClientValidator = [
    check("Nom").notEmpty().withMessage("nom is required"),
    check("prenom").notEmpty().withMessage("prenom is required"),
    check("adresse").notEmpty().withMessage("adress is required").custom(async(val)=>{
        const oneClient = await prisma.client.findUnique({
            where:{
                adresse : val
            }
        })
        if(oneClient){
            return Promise.reject(new Error("adress already exist"))
        }
    }),
    check("ville").notEmpty().withMessage("ville is required"),
    check("tele").notEmpty().withMessage("tele is required").isMobilePhone("ar-MA").withMessage("Invalid phone number only accepted maroc Phone numbers").custom(async(val)=>{
        const oneClient = await prisma.client.findUnique({
            where:{
                tele : val
            }
        })
        if(oneClient){
            return Promise.reject(new Error("tele already exist"))
        }
    }),
    check("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid Email adress").custom(async(val)=>{
        const oneClient = await prisma.client.findUnique({
            where:{
                email : val
            }
        })
        if(oneClient){
            return Promise.reject(new Error("email already exist"))
        }
    }),
   validatorMiddleware
]