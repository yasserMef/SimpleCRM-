const express = require("express")
const {createFacture,getFactures,getOneFacture,updateFacture,deleteFacture,getOne,validateClient}= require("../controlers/factureControler")
const {createFactureValidator} = require("../util/validator/factureValidator")
const router = express.Router()

router.route("/").post(createFactureValidator,validateClient,createFacture).get(getFactures)
router.route("/:id").get(getOneFacture).put(getOne,validateClient,updateFacture).delete(getOne,deleteFacture)
module.exports = router