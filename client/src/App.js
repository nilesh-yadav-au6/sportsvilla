import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/Register/RegisterPage'
import SingInPage from './pages/SignInPage'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ConfirmEmail from './pages/ConfirmEmail'
import Google from './pages/Google'
import Facebook from './pages/Facebook'
import ResetPassword from './pages/ResetPassword'
import NavBar from './components/NavBar'
import Schedule from "./pages/Schedule"
import Product from "./pages/Products/Product"
import ProductDetaill from "./components/ProductDetail/ProductDetaill"
import ScheduleDetaill from "./components/ScheduleDetail/ScheduleDetaill"
import PendingPage from "./pages/PendingOrder"
import CartPage from './pages/CartPage'
import Teams from './pages/Teams/Teams'
import TeamDetail from './pages/TeamDetail/SingleTeamDetail'
import Players from './pages/PlayerPool'
import PlayerDetail from './pages/PlayerDetail/playerDetail'
import UserEditPage from "./pages/UserDashboard"
import CreateRoom from './pages/CreateRoom/CreateRoom'
import HofPage from "./pages/HofPage/HofPage"
import HofDetaill from "./components/HofDetaill/HofDetaill.jsx"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div className="App">      
    <NavBar/>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='/signin' component={SingInPage} />
      <Route exact path='/forgotPassword' component={ForgotPassword} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/confirmEmail/:confirmToken' component={ConfirmEmail} />
      <Route exact path='/google' component={Google} />
      <Route exact path='/facebook' component={Facebook} />
      <Route exact path='/reset/:resetToken' component={ResetPassword} />
      <Route exact path="/schedules" component={Schedule} />
      <Route exact path="/products" component={Product} />
      <Route exact path="/productdetaill/:productId" component={ProductDetaill} />
      <Route exact path="/shceduledetaill/:scheduleId" component={ScheduleDetaill} />
      <Route exact path="/pending" component={PendingPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/teams" component={Teams} />
      <Route exact path="/team/detail/:teamId" component={TeamDetail} />
      <Route exact path="/players" component={Players} />
      <Route exact path="/player/detail/:playerId" component={PlayerDetail} />
      <Route exact path="/profile" component={UserEditPage} />
      <Route exact path="/auction" component={CreateRoom} />
      <Route exact path="/hofplayers" component={HofPage} />
      <Route exact path="/hofplayes/detaill/:hofPlayerId" component={HofDetaill} />
      <Redirect to='/' />
    </Switch>
    <Footer/>
    </div>
  );
}

export default App;
