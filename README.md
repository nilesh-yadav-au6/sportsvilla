#   Sports-Villa

##  Members      :  Nilesh Yadav and Himanshu Kashayap
##  Mentor	     :  Naveena Sharma	
##  Batch	     :  Woodpecker
##  Heroku Link :  https://sports-vella.herokuapp.com/

#   Overview
##  The basic idea of this project is to create a system where an user will be able to see all the upcoming events of a Cricket tournament, and buy merchandise related to cricket.  Team managements will be able to buy players from the player pool in the auction.

#   Specifications
##  The system is mainly divided into three sections, Administration, Team Management, and Users.
 	
##  Admin can login using valid credentials and perform various tasks such as adding team/management, adding products , adding players ,adding hall of fame players  and creating an auction where team managements can buy players.

##  Admin can also update and delete players , products , team management and hall of fame players.

##  Admin can also verify the payments made by the users.

##  Team management  can login with valid credentials received by the sports villa on his emailId. It can buy players in the auction.

##  Users can access the system by providing valid credentials access modules such as viewing their own profile. Users can buy products or tickets and make payment for the same.

##  Proposed system is easy to understand and user friendly too.



#   Technologies
##  The technologies that are going to be used for the project are as follows:

##  NodeJS         :  For building server and accessing the Database
##  ExpressJs      :  on top of NODE for writing less code at the server-side
##  Mongoose       :  As database base driver to connect with the database and node.
##  Cloudinary     :  For storing the file and images on cloud
##  Multer         :  For uploading the file and images
##  MongoDB atlas  :  To store the data on the cloud.
##  Nodemiler      :  For sending the mail
##  Heroku         :  For Deployment fo the app  
##  PassportJS     :  For authentication and login via google and facebook.
##  Razorpay       :  For Payment gateways.
##  Socket.io      :  For real- time auctioning of the players.
##  React          :  For implementing the front end part.
##  Redux          :  For State-management.
##  Redux-thunk    :  For action creators.

#   Backend Endpoints:-
#   1)  Request Type :- POST    Route :-  /admin/register
##  Using this route we can register Admin.
	
#   2)  Request Type :- POST    Route :-  /login
##  This is a common route for Admin, Trainer and User . They can Login to the system By providing valid credentials.

#   3)  Request Type :- POST    Route :-  /forgot-password
##  This is a common route for Admin, Trainer and User . They can get reset password email by providing registered email of user and perEmail for admin and trainer.

#   4)  Request Type :- POST    Route :-  /reset/:resetToken
##  This is a common route for Admin, Trainer and User. They can reset their password using this route by adding required details.
	
#   5)  Request Type :- POST   Route :- /change-password
##  This is a route for Users. After login they change their password. Accesstoken of respective personality is required in header. 

#  6)   Request Type :- POST   Route :- /add/product
##  Registered Admin can add products using this route after login to the System. Access Token of logged admin is required in the header. 

#  7)   Request Type :- PATCH     Route:-  /update/product/:productId
##  Registered Admin can update products using this route after login to the System.  Access Token of logged admin is required in the header. 

#  8)   Request Type :- GET     Route:-  /searchproduct
##  Users can get searched products by passing product name , category ,brand in product query. For pagination page and size in query are required. In mongo for protein search p must be in uppercase.

#   9)   Request Type :- GET     Route:-  /all/product
##  Users can get all the products. For pagination  page and size in query are required.

#   10) Request Type :- GET     Route:-  /single/product
##  Using this route users can get details of the product. By providing  productId    	in params

#   11) Request Type :- GET     Route:-  /product/category
##  Using this route users can get all the products by category.

#   12) Request Type :- DELETE     Route:-  /delete/product/:productId
##  This is a common route for deleting products , membership and gyms. Admin can delete these things. Header is required.

#   13) Request Type :- POST   Route :- /add/management
##  Registered Admin can add team management using this route after login to the System. Access Token of logged admin is required in the header. 

#   14) Request Type :- PATCH     Route:-  /update/management/:mangerId
##  Registered Admin can update team management using this route after login  to the System.  Access Token of logged admin is required in the header. 

#   15) Request Type :- PATCH     Route:-  /delete/management/:mangerId
##  Registered Admin can delete team management using this route after login to the System.  Access Token of logged admin is required in the header. 

#   16) Request Type :- GET     Route:-  /all/management
##  Users and admin can get all the team management. For pagination  page and sizes in the query are required.

#   17) Request Type :- GET     Route:-  /single/management/:managementId
##  Using this route users and admin can get details of the team management. By providing  managementId in params


#   18) Request Type :- POST   Route :- /add/schedule
##  Registered Admin can add schedule of match using this route after login to the System. Access Token of logged admin is required in the header. 

#   19) Request Type :- PATCH     Route:-  /update/schedule/:scheduleId
##  Registered Admin can update schedule of the match using this route after login to the System.  Access Token of logged admin is required in the header.

#   20) Request Type :- PATCH     Route:-  /delete/schedule/:scheduleId
##  Registered Admin can delete schedule of match using this route after login to the System.  Access Token of logged admin is required in the header. 

#   21) Request Type :- GET     Route:-  /all/schedule
##  Users and admin can get all the schedules. For pagination  page and size in query are required.

#   22) Request Type :- GET     Route:-  /singleschedule/:scheduleId
##  Using this route users and admin can get details of the particular schedule. By providing  scheduleId in params

#   23) Request Type :- GET     Route:-  /todayMatch/:matchDate
##  can get details of the particular match on a particular date. By providing  match date in params

#   24)	Request Type :- POST   Route :- /add/player
##  Registered Admin can add players using this route after login to the System. Access Token of logged admin is required in the header. 

#   25) Request Type :- PATCH     Route:-  /update/player/:playerId
##  Registered Admin can update player using this route after login to the System.  Access Token of logged admin is required in the header. 

#   26) Request Type :- PATCH     Route:-  /delete/player/:playerId
##  Registered Admin can delete player using this route after login to the System.  Access Token of logged admin is required in the header. 

#   27) Request Type :- GET     Route:-  /updatetrueAuction/:playerId
##  Using this route admin changes the auctionState of the player from false to true.

#   28)  Request Type :- GET     Route:-  /updateflaseAuction/:playerId
##  Using this route admin changes the auctionState of the player from true to false.

#   29) Request Type :- GET     Route:-  /all/player
##  Users and admin can get all the team players. For pagination  page and size in Query is required.

#  30)  Request Type :- GET     Route:-  /single/player/:playerId
##  Using this route users and admin can get details of the player. By providing managementId in params

#   31)	Request Type :- POST   Route :- /add/playerHOF
##  Registered Admin can add hall of fame players using this route after login to the System. Access Token of logged admin is required in the header.

#   32)  Request Type :- PATCH     Route:-  /update/playerHOF/:playerId
##  Registered Admin can update hall of fame player using this route after login to the System.  Access Token of logged admin is required in the header.

#   33)  Request Type :- PATCH     Route:-  /delete/playerHOF/:playerId
##  Registered Admin can delete hall of fame player using this route after login to the System.  Access Token of logged admin is required in the header.

#   34) Request Type :- GET     Route:-  /all/playerHOF
##  Users and admin can get all the hall of fame players. For pagination  page and sizes in query are required.

#   35) Request Type :- GET     Route:-  /single/playerHOF/:playerId
##  Using this route users and admin can get details of the hall of fame  player. By providing  managementId in params

#   36) Request Type :- PATCH Route:-  /update/auction
##  Using this route admin provides the auction Id to all the managements.

#   37) Request Type :- PATCH Route:-  /close/auction
##  Using this route admin removes the auction Id from all the managements.

#   38) Request Type :- POST    Route :-  /user/register
##  Using this route  users can register themselves.

#   39) Request Type :- GET      Route :- /user/profile
##  Using this route users can view his profile. User header is required.

#   40) Request Type :- GET      Route :- /edit/userprofile
##  Using this route users can change his profile picture and password. User header is required.

#   41) Request Type :- GET     Route :- /user/google
##  A user can via google using this route.

#   42) Request Type :- GET     Route :- /user/facebook
##  A user can via facebook using this route.

#   43) Request Type :- GET     Route :- /confirm/:confirmToken
##  This route will be sent in the confirmation email of user by clicking on this link the user can confirm his account.

#   44) Request Type :- POST    Route :- /user/create-password
##	This route will allow the user to set a password after they are logged in through google and facebook. User header is required.

#   45) Request Type :- POST    Route :- /add/cart/:productId
##  Using this route users can add products to the cart. User has to provide the access token in the authorization header.

#   46) Request Type :- POST    Route :- /increaseQuantity/:productId
##  Using this route users can increase the product quantity in the cart. User has to provide the access token in the authorization header. 

#   47) Request Type :- POST    Route :- /decreaseQuantity/:productId
##  Using this route users can increase the product quantity in the cart. User has to provide the access token in the authorization header. 

#   48) Request Type :- GET       Route :- /get/cart
##  This route will help users to view his cart and what product he has added into the cart. User has to provide the access token in the authorization header.  

#   49) Request Type :- POST     Route :- /order/:productId
##  Using this route user can buy a single product ,membership , trainer , workout plan , dietplan. User has to provide the access token in the authorization header.    

#   50) Request Type :- POST     Route :- /cart/order
##  Using this route users can buy a thing which ever he has added to the cart. User has to provide the access token in the authorization header.


#   51) Request Type :- POST     Route :- /pendingOrder
##  Using this route a pending order is created on placing order by the user and after creating the pending order Admin verifies that pending order.

#   52) Request Type :- GET     Route :- /allPendingOrder
##  Using this route Admin get all the pending orders.


#   53) Request Type :- POST     Route :- /verify
##  Using this route admin can verify the payment made by the user to razorpay and capture the payment. Admin header is required for the verification. 

#   54) Request Type :- POST      Route :- /add/review/:productId
##  Using this route users can add reviews for the product. User header is required.

#   55) Request Type :- PATCH      Route :- /update/review/:reviewId
##  Using this route users can update reviews for the product. User header is required.    

#   56) Request Type :- DELETE      Route :- /delete/review/:reviewId
##  Using this route users can delete reviews for the product.User header is required.

#   57) Request Type :- GET      Route :- /getreview/:productId
##  This route will allow users to see review added by the users for a particular Product.

#   Frontend Pages:-
#   HomePage        Route :-  /
##  This is the home page of sports-villa, here you can see the matches in t	he carousel for that particular day. There is a Hall of fame player section where you can see the hall of fame players.

#   2) Register Page        Route :-  /register
##  This is the registration page where a user can register himself by adding the required fields. Form validation is also applied here.

#   3) Sign In Page     Route :-  /signin
##  This is a common route for Admin, Team management and User . They can login here by providing the correct credentials. Form validations are also present on it.

#   4) Forgot Password Page     Route :-  /forgotpassword
##  This is a common route for Team management and users. They can provide the valid email and a password resetting link will be sent to the user.

#   5) Reset Password Page      Route :- /reset/:resetToken
##  After clicking on the password resetting link , the user will be redirected to the reset password page.  Here users can enter a new password and set the password.    

#   6)	Dashboard  Page     Route :- /dashboard
##  The Dashboard page contains conditionally rendered dashboard page for admin and team management. On the dashboard page the admin can add a player, product, team management , hall of fame player and also create an auction. And  Team management can view the bought player and their details and they can also join in the auction after the admin has created the auction. This is a protected page for admin and team management.
 
#   7)  Schedule Page       Route:-  /schedules
##  Users can see all the schedules of the cricket matches.

#   8)  Product Page        Route:-  /products
##  Users can see all the products listed in the site and this page also has the option of selecting the products by category.

#   9)  Schedule Detail  Page       Route:-  /schedulesdetaill/:scheduleId
##  Users can see single ticket details on this page.

#   10)  Product Detail Page        Route:-  /productdetaill.:productId
##  Users can see product details on this page.

#   11)  Teams Page     Route:-  /reams
##  Users and admin can see all the teams on this page.

#   12)  Player Page        Route:-  /players
##  Users and admin can see all the players on this page.

#   13)  HAll of Player Page        Route:-  /hofplayers
##  Users and admin can see all the hall of fame players on this page.

#   14)  Team Detail  Page      Route:-  /team/detaill/:teamId
##  Users and admin can see single team details on this page.

#   15)  Player Detail Page     Route:-  /player/detaill/:playerId
##  Users and admin can see single player details on this page.

#   16)  Hall of Fame Detail Page       Route:-  /hofplayer/detaill/:hofplayerId
##  Users and admin can see single hall of fame player details on this page.

#   17)  Order Pending      Route:-  /pending
##  This is the order pending page admin can see the pending verification of orders. And the admin can verify the payments here. This is a protected page for admin.

#   18) Cart Page       Route:-  /cart
##  On this page can see the products and tickets added in the cart and make      the payments. This is a protected page for Users.

#   19) Auction Page        Route:- /auction
##  This page can be accessed by the admin and team management for the bidding of the players.

#   20)  Profile Page For User      Route:- /profile
##  This page can be accessed by the users for editing the password , changing the profile picture and they can also see their order history..

#   Conclusion
##  The main aim of the sports-villa is to provide a one stop solution for the user to buy products related to cricket and buy match tickets on one platform.
##  The other feature is to auction the players , using the auction systems of the sports-villa.
##  In this project we were able to learn many frontend and backend technologies.

#   Best Regards & Thanking You
