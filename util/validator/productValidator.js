const {check} = require("express-validator")
const {PrismaClient} = require("@prisma/client")
const validatorMiddleware= require("../../middlewares/validatorMiddleware")
const prisma = new PrismaClient()

exports.createProductValidator = [
    check("quantite").notEmpty().withMessage("quantite is required").isNumeric().withMessage(" quantite must be number"),
    check("prix_achat").notEmpty().withMessage("prix achat is required").isFloat().withMessage(" prix achat must be Float"),
    check("prix_vente").notEmpty().withMessage("prix vente is required").isFloat().withMessage(" prix vente must be Float"),
    check("color").notEmpty().withMessage("color is required"),
    validatorMiddleware
]

