const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { commonLogin, 
        renderForgotPasswordEmail, 
        renderAllResetPassword, 
        renderChangePassword, 
        commonLogOut } = require('../../controllers/apiControllers/commonApiController')

router.post('/login', passport.authenticate('local', {session: false}), commonLogin)
router.post('/forgot-password', renderForgotPasswordEmail)
router.post('/reset/:resetToken', renderAllResetPassword)
router.post('/change-password', passport.authenticate('jwt', {session: false}), renderChangePassword)
router.delete('/logout',passport.authenticate('jwt', {session: false}), commonLogOut)

module.exports = router
