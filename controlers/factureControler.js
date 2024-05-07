const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler')
const ApiError = require("../util/apiError")


exports.validateClient = asyncHandler(async(req,res,next)=>{
    const oneClient = await prisma.client.findUnique({
        where:{
          id:req.body.cltId
        }
    })
    if(!oneClient){
    return next(new ApiError(`this ${req.body.cltId} don't belong to client id`,400))
    }
    next()
})

exports.createFacture = asyncHandler(async(req,res,next)=>{
   const newFacture = await prisma.facture.create({
        data : req.body
    })
    res.status(200).json({
        data : newFacture
    })
})

exports.getFactures = asyncHandler(async(req,res)=>{
    const allFactures = await prisma.facture.findMany({
        include:{
            detailFactures:true
        }
    })
    res.status(200).json({
        data:allFactures
    })
})

exports.getOneFacture = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneFacture = await prisma.facture.findUnique({
        where:{
            id: Number(id)
        }
    })
    if(!oneFacture){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    res.status(200).json({
        data:oneFacture
    })
})

exports.getOne = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneFacture = await prisma.facture.findUnique({
        where:{
            id: Number(id)
        },
        include:true
    })
    if(!oneFacture){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    next()
})

exports.updateFacture = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
   const updateOneFacture = await prisma.facture.update({
        where:{
            id:Number(id)
        },
        data:req.body
    })
    console.log(updateOneFacture)
    
    res.status(200).json({
        data:updateOneFacture
    })
})

exports.deleteFacture = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    await prisma.facture.delete({
       where:{
        id:Number(id)
       }
   })
    res.send()
})

