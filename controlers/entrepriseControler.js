const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler')
const ApiError = require("../util/apiError")

exports.createEntreprise = asyncHandler(async(req,res)=>{
    const newEntreprise = await prisma.entreprise.create({
        data :req.body
    })
    res.status(201).json({
        data :{
            ...newEntreprise,
        identifiant_fiscal:Number(newEntreprise.identifiant_fiscal),
        tele:Number(newEntreprise.tele)
        }
    })
})

exports.getEntreprises = asyncHandler(async(req,res)=>{
    let getAllEntreprises = await prisma.entreprise.findMany()
     getAllEntreprises = getAllEntreprises.map(item=>({
        ...item,
       identifiant_fiscal:Number(item.identifiant_fiscal),
        tele:Number(item.tele),
    }))
    res.status(201).json(
       { data:getAllEntreprises}
    )
})

exports.getOneEntreprise = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const getOneEntre = await prisma.entreprise.findUnique({
        where:{
            id : Number(id)
        }
    }) 
    if(!getOneEntre){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    res.status(200).json({
        ...getOneEntre,
        identifiant_fiscal:Number(getOneEntre.identifiant_fiscal),
        tele:Number(getOneEntre.tele)
    })
})

   exports.getOne = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const getOneEntre = await prisma.entreprise.findUnique({
        where:{
            id : Number(id)
        }
    }) 
    if(!getOneEntre){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    next()
})

exports.updateOneEntreprise = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
   const updateOneEntre = await prisma.entreprise.update({
        where:{
            id : Number(id)
        },
        data : req.body
    })
    res.status(200).json({
        ...updateOneEntre,
        identifiant_fiscal:Number(updateOneEntre.identifiant_fiscal),
        tele:Number(updateOneEntre.tele)
   })
})

exports.deleteOneEntreprise = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    await prisma.entreprise.delete({
        where:{
            id : Number(id)
        }
    }) 
  res.send()
})