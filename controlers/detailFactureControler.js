const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const asyncHandler = require('express-async-handler')
const ApiError = require("../util/apiError")


exports.validateOne = asyncHandler(async(req,res,next)=>{
    const oneFacture = await prisma.facture.findUnique({
         where:{
             id: req.body.factId
         },
         
     })
     if(!oneFacture){
         return next(new ApiError(`this ${req.body.factId} don't belong to facture id`,400))
     }
     const oneProduct = await prisma.product.findUnique({
         where:{
             id : req.body.prodId
         }
     })
     if(!oneProduct){
         return next(new ApiError(`this ${req.body.prodId} don't belong to product id`,400))
     }
     if(req.body.qauntite > oneProduct.quantite){
        return next(new ApiError(`this product is not in stock`,400))
    }
    
    req.oneProduct = oneProduct
    next()
})

exports.validateOneCreate= asyncHandler(async(req,res,next)=>{
    if(req.body.qauntite){
        await prisma.product.update({
            where:{
                id : req.body.prodId
            },
            data :{
                quantite : req.oneProduct.quantite - req.body.qauntite
            }
        })
    }
    next()
})

exports.createDetailFacture = asyncHandler(async(req,res,next)=>{
   const newDetailFacture = await prisma.detailFacture.create({
        data:req.body
    })
    res.status(200).json({
        data:newDetailFacture
    })
})

exports.getDetailFactures = asyncHandler(async(req,res)=>{
   const detailFactures= await prisma.detailFacture.findMany()
   res.status(201).json({
    data :detailFactures
   })

})

exports.validateIds =asyncHandler(async(req,res,next)=>{
    if(!req.body.factId || !req.body.prodId ){
        next(new ApiError("error",400))
     }
     next()
})

exports.getOneDetailFacture = asyncHandler(async(req,res,next)=>{
    const oneDetailProd = await prisma.detailFacture.findFirst({
        where :
       {AND:[{
            factId : req.body.factId
            },
        {
            prodId : req.body.prodId
        }
    ]}
    })
    if(!oneDetailProd){
        return next(`this ${req.body.factId} or ${req.body.prodId} is not correct`,400)
    }
    res.status(200).json({
        data : oneDetailProd
    })
})

exports.validateOneUpdateDelete = asyncHandler(async(req,res,next)=>{
    const oneDetailFacture = await prisma.detailFacture.findFirst({
        where :
       {
        AND:[{
            factId : req.body.factId
            },
        {
            prodId : req.body.prodId
        }
    ]}
    })
   if(!oneDetailFacture){
        next(next(new ApiError(`this ${req.body.factId} or ${req.body.prodId} is not correct`,400)))
    }
    if(req.body.qauntite){
        await prisma.product.update({
            where:{
                id : req.body.prodId
            },
            data :{
                quantite : (req.oneProduct.quantite + oneDetailFacture.qauntite) - req.body.qauntite
            }
        })  
    }
    next()
})

exports.updateOneDetailFacture = asyncHandler(async(req,res,next)=>{
   const updateDetailFacture = await prisma.detailFacture.updateMany({
        where :
       {AND:[{
            factId : req.body.factId
            },
        {
            prodId : req.body.prodId
        }
    ]},
    data:req.body
    })
    res.status(200).json({
        data : updateDetailFacture
    })
   
})


exports.deleteDetailFacture = asyncHandler(async(req,res,next)=>{
   await prisma.detailFacture.deleteMany({
        where :
       {AND:[{
            factId : req.body.factId
            },
        {
            prodId : req.body.prodId
        }
    ]},
   })
   res.send()
})
