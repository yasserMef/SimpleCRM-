const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler')
const ApiError = require("../util/apiError")

exports.createProduct = asyncHandler(async(req,res,next)=>{
    if(req.body.prix_achat >= req.body.prix_vente){
        return next(new ApiError("the purchase price must be less than the selling price",400))
    }
    req.body.taux_marge = ((req.body.prix_vente - req.body.prix_achat)/req.body.prix_achat )*100
    const newProduct = await prisma.product.create({
        data : req.body
    })
    
    res.status(201).json({data:newProduct})
})

exports.getProducts = asyncHandler(async(req,res)=>{
    const getProducts = await prisma.product.findMany({})
    res.status(200).json({
        data : getProducts
    })
})



exports.getOneProduct= asyncHandler (async(req,res,next)=>{
   const id = req.params.id
    const oneProduct = await prisma.product.findUnique({
        where:{
            id : Number(id)
        }
    })
    if(!oneProduct){
        return next(new ApiError(`this ${id} is not correct`))
    }
    res.status(201).json({
        data : oneProduct
    })
})

exports.updateProduct = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneProduct = await prisma.product.findUnique({
        where:{
            id : Number(id)
        }
    })
    if(!oneProduct){
        return next(new ApiError(`this ${id} is not correct`))
    }
    if(req.body.prix_achat >= req.body.prix_vente|| req.body.prix_achat >= oneProduct.prix_vente||oneProduct.prix_achat >= req.body.prix_vente){
        return next(new ApiError("the purchase price must be less than the selling price",400))
    }
    
    if(req.body.prix_achat && req.body.prix_vente  ){
        req.body.taux_marge = ((req.body.prix_vente - req.body.prix_achat)/req.body.prix_achat )*100
    }else if(req.body.prix_achat && oneProduct.prix_vente){
        req.body.taux_marge = ((oneProduct.prix_vente - req.body.prix_achat)/req.body.prix_achat )*100
    }else if(req.body.prix_vente && oneProduct.prix_achat && oneProduct.prix_achat ){
        req.body.taux_marge = ((req.body.prix_vente - oneProduct.prix_achat)/oneProduct.prix_achat )*100
    }
    
const updateOneProduct = await prisma.product.update({
        where:{
            id : Number(id)
        },
        data:req.body
    })
    res.status(201).json({
        data : updateOneProduct
    })
})

exports.deleteProduct = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const oneProduct = await prisma.product.findUnique({
        where:{
            id : Number(id)
        }
    })
    if(!oneProduct){
        return next(new ApiError(`this ${id} is not correct`))
    }
    await prisma.product.delete({
        where:{
            id : Number(id)
        }
    })
    res.send()
})