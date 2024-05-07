const express = require("express")
const {createEntreprise ,getEntreprises,updateOneEntreprise,deleteOneEntreprise,getOneEntreprise,getOne}= require("../controlers/entrepriseControler")
const {createEntrepriseValidator} = require("../util/validator/entrepriseValidator")
const router = express.Router()

router.route("/").post(createEntrepriseValidator,createEntreprise).get(getEntreprises)
router.route("/:id").put(getOne,updateOneEntreprise).delete(getOne,deleteOneEntreprise).get(getOneEntreprise)
module.exports = router