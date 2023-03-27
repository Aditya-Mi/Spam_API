const express = require("express");
const controller = require('./../controllers/Controllers')

const router = express.Router()



router.route('/report').get(controller.getReport).post(controller.addReport)


router.route("/spam").get(controller.getSpam)
router.route('/spam/check/:number').get(controller.checkSpam)

module.exports = router;
