import React, { Component } from "react";
import { connect } from "react-redux";
import { singleProduct, deleteProductAdmin, fetchProduct, updateProductAdminAction } from "../../redux/actions/productAction";
import { addCartAction, getCartAction } from '../../redux/actions/addCartAction'
import style from "./ProductDetail.module.css";
import  { getReviews ,addReview } from '../../redux/actions/reviewAction'
import { Collapse } from "reactstrap"
import axios from 'axios'
import { Link } from "react-router-dom"
import Review from "../Review/Review"
import { NotificationManager } from 'react-notifications';

class ProductDetaill extends Component {

  state ={
    razorpay: null,
    isProductOpen: false,
    productName: "", brand: "", price: "", category: "",
    toggleDelete: false,
    review:"",
  }
  
  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handelSingleFile = e => {
    const image = e.target.files[0]
    this.setState({ image })
  }

  toggleProduct = () => this.setState({ isProductOpen: !this.state.isProductOpen });
  
  handelReview = e => {
    try{
      e.preventDefault()
      console.log(this.state.review)
      this.props.addReview(this.state.review , this.props.match.params.productId)
    } catch(err){
      console.log(err)
    }finally{
      setTimeout(()=> {
        this.props.getReviews(this.props.match.params.productId)
      },1000)
    }
  }

  handelAddProducts = e => {
    try{
      e.preventDefault()
      const productId = this.props.match.params.productId
      const { productName, brand, price, category, image } = this.state
      this.props.updateProductAdminAction({productName, brand, price, category, image, productId})
    }catch(err){
      console.error(err)
    }finally{
      const productId = this.props.match.params.productId;
      setTimeout(()=>{
        this.props.singleProduct(productId);
      }, 5000) 
    }
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.singleProduct(productId);
    this.props.getReviews(productId)
  }

  handleClick = async (e) =>{
    e.preventDefault();
    if(this.props.user!==null){
      const orderUrl = `https://sports-vella.herokuapp.com/order/${this.props.match.params.productId}`;
      const pendingOrd = `https://sports-vella.herokuapp.com/pendingOrder`
      const User = localStorage.getItem('user')
      const res = JSON.parse(User)
      const dat = res.data
      const token = dat.accessToken
      const response = await axios.post(orderUrl, {},{
        headers:{
          Authorization : token
        }
      });
      const { data } = response;
      console.log()
      const options = {
        key: process.env.RAZORPAY_APT_KEY,
        order_id: data.orderId,
        amount:data.amount,
        handler: async (response) => {
          try {
            await axios.post(pendingOrd, {amount:data.amount, currency: 'INR', ...response},{
              headers:{
                Authorization : token
              }
            });
            NotificationManager.success('Order placed successfully', 'Success')
            this.props.history.push(`/productdetaill/${this.props.match.params.productId}`)
          } catch (err) {
            console.log(err);
          }
        }
      }
      this.setState({"razorpay": new window.Razorpay(options)})
      this.state.razorpay.open();
    }else if(this.props.user===null){
      this.props.history.push('/signin')
    }
  }

  handelAddCart = () => {
    const productId = this.props.match.params.productId;
    try{
      if(this.props.user===null){
        this.props.history.push('/signin')
      }
      else if(this.props.user!==null){
        this.props.addCartAction(productId);
      }
    }catch(err){

    }finally{
      setTimeout(()=>{ 
        this.props.getCartAction()
      }, 1000)
    }
  }
  
  handelDeleteProduct = () =>{
    try{  
      const productId = this.props.match.params.productId;
      this.props.deleteProductAdmin(productId)
    }catch(err){
      console.error(err)
    }finally{
      setTimeout(()=>{
        this.props.fetchProduct(1,8)
        this.props.history.push('/products')
      }, 1000)
    }
  }

  handelDeleteToggle = () => {
    this.setState({ toggleDelete: !this.state.toggleDelete })
  }

  render() {
    return (
      this.props.product!==null?
      <div>
        <div className={style.card_div}>
          <div className={style.newPro}>
            <div className={style.child1Pro} >
              <img
                className={style.image_Card}
                src={this.props.product.image}
                alt="Cardcap"
              />
            </div>
            <div className={style.childPro} >
                <h1>Product Name: {this.props.product.productName}</h1>
                <h1>Brand: {this.props.product.brand}</h1>
                <h1>Price : {this.props.product.price}</h1>
                <div className={style.child2Pro} >
                {this.props.user!==null && this.props.user.data.commenUser.role==='User'?
                  <button className={"no-focusborder"} onClick={this.handleClick} >Buy Product</button>:
                  <button className={"no-focusborder"} disabled >Buy Product</button>}
                  <button className={"no-focusborder"} onClick={this.handelAddCart} >ADD TO CART</button>
                  {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
                  <>
                  <button className={"no-focusborder"} onClick={this.toggleProduct} >Update Product</button>
                  <button className={"no-focusborder"} onClick={this.handelDeleteToggle} >Delete Product</button>
                  {this.state.toggleDelete?
                  <div className={style.popup} >
                    <div className={style.mainPop} > 
                      <h4>Are you Sure ?</h4>
                      <button className={"no-focusborder"} onClick={this.handelDeleteToggle} > cancel </button> 
                      <button className={"no-focusborder"} color="danger" onClick={ this.handelDeleteProduct } >Delete</button>
                    </div>
                  </div>:null}
                  </>
                  :null}
                </div>
                <Collapse isOpen={this.state.isProductOpen}>
                    <div className="input-fields">
                        <form encType='multipart/form-data' onSubmit={this.handelAddProducts} >
                            <input type="text" name='productName' onChange={this.handelChange} value={this.state.productName} className="input" placeholder="Product Name" />
                            <input type="text" name='brand' onChange={this.handelChange} value={this.state.brand} className="input" placeholder="Brand" />
                            <input type="text" name='price' onChange={this.handelChange} value={this.state.price} className="input" placeholder="Price" />
                            <input type="text" name='category' onChange={this.handelChange} value={this.state.category} className="input" placeholder="Category" />
                            <input type="file" name='image' onChange={this.handelSingleFile}  />
                            <button className={"no-focusborder"} type='submit' >Update</button>
                        </form>
                    </div>
                  </Collapse>
            </div>
          </div >
        </div>
        <div className={style.reviewDiv}>
          <h1 style={{color:"black" , marginTop:"50px"}}>Product Review</h1>
          {this.props.user!==null && this.props.user.data.commenUser.role==='User'?
          <div className="input-fields" >
          <input type="text" name="review" onChange={this.handelChange} value={this.state.review} className="input" placeholder="Add Review"/>
          <button className={"no-focusborder"} onClick={this.handelReview}>Add Review</button>
          </div> :null}
          {this.props.user == null ? <Link to="/signin"><button className={"no-focusborder"} type='submit' >Add Review</button></Link> :null}
          {this.props.review !== null? this.props.review.map(review =>
            <div key={review._id}>
              <Review key={review._id}  review={review}/> 
            </div>
            )  : null}
        </div>
      </div>
      : <div className={style.loader}>Loading...</div>
    );
  }
}

const mapStateProp = (stateStore) => {
  return {
    product: stateStore.productState.singleProduct,
    user: stateStore.loginState.user,
    review : stateStore.reviewState.reviews,
  };
};

export default connect(mapStateProp, { singleProduct, addCartAction, deleteProductAdmin, fetchProduct, updateProductAdminAction, getCartAction, getReviews, addReview })(ProductDetaill);
