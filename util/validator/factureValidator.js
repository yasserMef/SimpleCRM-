const {check} = require("express-validator")
const {PrismaClient} = require("@prisma/client")
const validatorMiddleware= require("../../middlewares/validatorMiddleware")
const prisma = new PrismaClient()

exports.createFactureValidator = [
    check("cltId").notEmpty().withMessage("client id is required").custom(async(val)=>{
        const oneClient = await prisma.client.findUnique({
            where :{
                id : val
            }
        })
        if(!oneClient){
            return Promise.reject(`this id ${val} is not in client id`)
        }
    }),
    validatorMiddleware
]
