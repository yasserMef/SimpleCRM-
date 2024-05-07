const {check} = require("express-validator")
const {PrismaClient} = require("@prisma/client")
const validatorMiddleware= require("../../middlewares/validatorMiddleware")
const prisma = new PrismaClient()

exports.createDetailFactureValidator = [
    check("prodId").notEmpty().withMessage("id product is required").isNumeric().withMessage("must be number").custom(async(val)=>{
       const oneProduct = await prisma.product.findUnique({
        where:{
            id : val
        }
       })   
       if(!oneProduct){
        return Promise.reject(new Error(`this id ${val} is not in product id`))
       }
    }),
    check("factId").notEmpty().withMessage("id facture is required").isNumeric().withMessage("must be number").custom(async(val)=>{
        const oneFacture = await prisma.facture.findUnique({
         where:{
             id : val
         }
        })   
        if(!oneFacture){
         return Promise.reject(new Error(`this id ${val} is not in facture id`))
        }
     }),
     check("qauntite").notEmpty().withMessage("quantite is required").isNumeric().withMessage("must be number"),
     validatorMiddleware
]