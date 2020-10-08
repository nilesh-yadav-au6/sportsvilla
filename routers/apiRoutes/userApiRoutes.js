const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { registerUser, editProfileUser } = require('../../controllers/apiControllers/userApiControllers')
const { check } = require('express-validator')
const upload = require('../../utils/multer')

router.post('/user/register',[ 
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name should contain atleast Three characters').isLength({min: 3}),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'Password should be of atleast 4 charaters').isLength({min: 4}) 
], registerUser)
router.patch("/edit/userprofile" , passport.authenticate('jwt', {session: false}) , upload.single("image"), editProfileUser)


module.exports = router
