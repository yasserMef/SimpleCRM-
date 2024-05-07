const express = require("express")
const {createClinet,getClients,getOneClient,updateClient,deleteClient,getOne}= require("../controlers/clientControler")
const {createClientValidator} = require("../util/validator/clientValidator")
const router = express.Router()

router.route("/").post(createClientValidator,createClinet).get(getClients)
router.route("/:id").put(getOne,updateClient).delete(getOne,deleteClient).get(getOneClient)
module.exports = router