const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler')
const ApiError = require("../util/apiError")


exports.createClinet = asyncHandler(async(req,res)=>{
    console.log("hello")
    const newClient = await prisma.client.create({
        data : req.body
    })
    res.status(201).json({
        data:newClient
    })
})

exports.getClients = asyncHandler(async(req,res)=>{
    const allClients = await prisma.client.findMany()
    res.status(200).json({
        data:allClients
    })
})

exports.getOneClient = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneClient = await prisma.client.findUnique({
        where:{
          id:Number(id)
        }
    })
    if(!oneClient){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    res.status(200).json({
        data:oneClient
    })
})

exports.getOne= asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneClient = await prisma.client.findUnique({
        where:{
          id:Number(id)
        }
    })
    if(!oneClient){
        return next(new ApiError(`this ${id} is not correct`,400))
    }
    next()
})

exports.updateClient = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const updateOne = await prisma.client.update({
        where:{
            id:Number(id)
        },
        data:req.body
    })
    res.status(200).json({
        data : updateOne
    })
})

exports.deleteClient = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    await prisma.client.delete({
        where:{
            id:Number(id)
        },
        
    })
    res.send()
})