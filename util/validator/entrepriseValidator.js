const {check} = require("express-validator")
const {PrismaClient} = require("@prisma/client")
const validatorMiddleware= require("../../middlewares/validatorMiddleware")
const prisma = new PrismaClient()


exports.createEntrepriseValidator = [
    check("nom_entreprise").notEmpty().withMessage("nom entreprise is required").custom(async(val)=>{
        const oneEntreprise = await prisma.entreprise.findUnique({
            where :{
                nom_entreprise : val
            }
        })
        if(oneEntreprise){
            return Promise.reject("entreprise name is already exist")
        }
    }),
    check("siege_social").notEmpty().withMessage("siege social is required").custom(async(val)=>{
        const oneEntreprise = await prisma.entreprise.findUnique({
            where :{
                siege_social : val
            }
        })
        if(oneEntreprise){
            return Promise.reject("siege social is already exist")
        }
    }),
    check("identifiant_fiscal").notEmpty().withMessage("fiscal identifiant is required").custom(async(val)=>{
        const oneEntreprise = await prisma.entreprise.findUnique({
            where :{
                identifiant_fiscal : val
            }
        })
        if(oneEntreprise){
            return Promise.reject("fiscal identifiant is already exist")
        }
    }),
    check("capital").notEmpty().withMessage("capital is required").isFloat().withMessage("must be Float"),
    check("nombre_employes").notEmpty().withMessage("nombre employes is required").isNumeric().withMessage("must be Number"),
    check("ville").notEmpty().withMessage("ville is required"),
    check("responsable").notEmpty().withMessage("responsable is required"),
    check("tele").notEmpty().withMessage("tele is required").isMobilePhone("ar-MA").withMessage("Invalid phone number only accepted maroc Phone numbers").custom(async(val)=>{
        const oneClient = await prisma.entreprise.findUnique({
            where:{
                tele : val
            }
        })
        if(oneClient){
            return Promise.reject(new Error("tele already exist"))
        }
    }),
    check("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid Email adress").custom(async(val)=>{
        const oneClient = await prisma.entreprise.findUnique({
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