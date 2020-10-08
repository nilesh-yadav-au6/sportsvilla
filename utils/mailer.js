const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')
const {USER_EMAIL, USER_PASSWORD, NODE_ENV} = process.env
const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    debug: NODE_ENV === 'production',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
}
const mailTranport =nodemailer.createTransport(transport)

const sendMailToUser = async (mode, email, token) => {
    const domainName = process.env.DOMAIN_NAME || `http://localhost:3000`;
    let html = null;
    if (mode === "confirm")
      html = `<h1>Welcome to Sports-Villa</h1>
      <p>Thanks for creating an account. Click 
      <a href=${domainName}/confirmEmail/${token}>here</a> to confirm your account. </p>`
    else if (mode === "reset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please <a href=${domainName}/reset/${token} > click here </a>  and fill the required fields to reset your password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode === "adminReset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please <a href=${domainName}/reset/${token} > click here </a>  and fill the required fields to reset your password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode.mode === "trainerConfirm")
      html = `<h1>Welcome to Sports-Villa</h1>
      <h2>Congratulation you are selected as Manager in Sports-Villa</h2>.
      <h3>Your official email is: ${mode.email}</h3>
      <h3>And password is: ${mode.password}</h3>
      <p> Click <a href=${domainName}/confirmEmail/${token}>here</a> to confirm your account.</p>`
    else if (mode === "trainerReset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please <a href=${domainName}/reset/${token} > click here </a>  and fill the required fields to reset your password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode === "Workout")
      html = `<h1>Hi there.</h1>
      <h2>Please download Ticket from here: ${token}</h2>
      <p>Thanksyou</p>`
      else if (mode === "dietplan")
      html = `<h1>Hi there.</h1>
      <h2>Please download Ticket from here: ${token}</h2>
      <p>Thanksyou</p>`   
    else if (mode === "order")
      html = `<h1>Hi there.</h1>
      <h2>Your order has been successfully placed your transaction id is: ${token}</h2>
      <h3>Thanksyou</h3>`   

    function message(mode){
        let msg = null
        if (mode === 'reset') msg = "Reset your password"
        if (mode === 'trainerReset') msg = "Reset your password"
        if (mode === 'confirm') msg = "Confirm your email"
        if (mode.mode === 'trainerConfirm') msg = "Confirm your email"
        if (mode === 'Workout') msg = "Sports-Villa match ticket"
        if (mode === 'dietplan') msg = "Sports-Villa match ticket"
        if (mode === 'order') msg = "Sports-Villa orderConfirmation"
        return msg
      }
      try {
      await mailTranport.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: message(mode),
        html
      })
    } catch (err) {
      console.log(err)
    }
}

module.exports = sendMailToUser