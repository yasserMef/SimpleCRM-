const express = require("express")
const {createDetailFacture,getDetailFactures,updateOneDetailFacture,getOneDetailFacture,deleteDetailFacture,validateIds,validateOne,validateOneCreate,validateOneUpdateDelete}= require("../controlers/detailFactureControler")
const {createDetailFactureValidator} = require("../util/validator/detailFactureValidator")
const router = express.Router()

router.route("/").post(createDetailFactureValidator,validateOne,validateOneCreate,createDetailFacture).get(getDetailFactures)
router.route("/updateDetailFacture").put(validateIds,validateOne,validateOneUpdateDelete,updateOneDetailFacture)
router.get("/getOneDetailFacture",validateIds,validateOne,getOneDetailFacture)
router.delete("/deleteDetailFacture",validateIds,validateOne,validateOneUpdateDelete,deleteDetailFacture)
module.exports = router