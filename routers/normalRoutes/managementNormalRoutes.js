const { Router } = require('express')
const router = Router()

const { getAllManagement, getSingleManagement } = require('../../controllers/normalControllers/managNormalCOntroller')


router.get('/all/management' , getAllManagement)
router.get('/single/management/:managementId', getSingleManagement)


module.exports = router