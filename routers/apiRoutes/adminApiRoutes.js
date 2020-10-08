const { Router } = require('express')
const passport =  require("passport")
const router = Router()
const { registerAdmin ,updateAuction, closeAuction } = require('../../controllers/apiControllers/adminApiControllers')
const { check } = require('express-validator')
router.post('/admin/register',[ 
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name should contain atleast Three characters').isLength({min: 3}),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('personalEmail', 'Personal Email is required').not().isEmpty(),
    check('personalEmail', 'Invalid Personal Email').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'Password should be of atleast 4 charaters').isLength({min: 4}) 
], registerAdmin)

router.patch("/update/auction" , passport.authenticate('jwt', {session: false}) , updateAuction)
router.patch("/close/auction" , passport.authenticate('jwt', {session: false}) , closeAuction)

module.exports = router