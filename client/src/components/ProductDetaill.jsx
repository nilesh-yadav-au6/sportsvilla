import React, { Component } from "react";
import { connect } from "react-redux";
import { singleProduct, deleteProductAdmin, fetchProduct, updateProductAdminAction } from "../redux/actions/productAction";
import { addCartAction } from '../redux/actions/addCartAction'
import style from "../Styles/ProductList.module.css";
import { CardTitle, CardBody, Collapse } from "reactstrap";
import axios from 'axios'

class ProductDetaill extends Component {

  state ={
    razorpay: null,
    isProductOpen: false,
    productName: "", brand: "", price: "", category: "", 
  }

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handelSingleFile = e => {
    const image = e.target.files[0]
    this.setState({ image })
  }

  toggleProduct = () => this.setState({ isProductOpen: !this.state.isProductOpen });

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
            alert('OrderPlacedSuccessfully')
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
    if(this.props.user===null){
      this.props.history.push('/signin')
    }
    else if(this.props.user!==null){
      this.props.addCartAction(productId);
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
        this.props.fetchProduct()
        this.props.history.push('/products')
      }, 1000)
    }
  }
  
  render() {
    return (
      this.props.product!==null?<div className={style.card_div}>
        <img
          className={style.image_Card}
          src={this.props.product.image}
          alt="Cardcap"
        />
        <CardBody>
          <CardTitle>{this.props.product.productName}</CardTitle>
          <CardTitle>Price : {this.props.product.price}</CardTitle>
        {this.props.user!==null && this.props.user.data.commenUser.role==='User'?
        <button className={"no-focusborder"} onClick={this.handleClick} >Buy Product</button>:
        <button className={"no-focusborder"} disabled >Buy Product</button>}
        <button className={"no-focusborder"} onClick={this.handelAddCart} >ADD TO CART</button>
        {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
        <>
        <button className={"no-focusborder"} onClick={this.toggleProduct} >Update Product</button>
        <button className={"no-focusborder"} onClick={this.handelDeleteProduct} >Delete Product</button>
        <Collapse isOpen={this.state.isProductOpen}>
          <div className="input-fields">
              <form encType='multipart/form-data' onSubmit={this.handelAddProducts} >
                  <input type="text" name='productName' onChange={this.handelChange} value={this.state.productName} className="input" placeholder="Product Name" />
                  <input type="text" name='brand' onChange={this.handelChange} value={this.state.brand} className="input" placeholder="Brand" />
                  <input type="text" name='price' onChange={this.handelChange} value={this.state.price} className="input" placeholder="Price" />
                  <input type="text" name='category' onChange={this.handelChange} value={this.state.category} className="input" placeholder="Category" />
                  <input type="file" name='image' onChange={this.handelSingleFile}  />
                  <button className={"no-focusborder"} type='submit' >Add</button>
              </form>
          </div>
        </Collapse>
        </>
        :null}
        </CardBody>
      </div>: null
    );
  }
}

const mapStateProp = (stateStore) => {
  return {
    product: stateStore.productState.singleProduct,
    user: stateStore.loginState.user,
  };
};

export default connect(mapStateProp, { singleProduct, addCartAction, deleteProductAdmin, fetchProduct, updateProductAdminAction })(ProductDetaill);
