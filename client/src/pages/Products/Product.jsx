import React ,{ Component} from 'react'
import { connect } from "react-redux"
import { fetchProduct, fetchBatProduct, fetchFuzzySearchProduct } from "../../redux/actions/productAction"
import ProductList from "../../components/ProductListItems/ProductList"
import style from './Products.module.css'
import { Link } from 'react-router-dom'
import SearchIco from '../../images/search-50.png'

class ProductReducer extends Component{
  state = {
    cricketBat: false,
    cricketBall: false,
    protection: false,
    cricketHelmet: false,
    cricketBags: false,
    searchProduct: false,
    allProduct: true,
    search: "",
    sorting: false,
    amount: 999999999,
    ascending: false,
    descending: false,
  }

  componentDidMount(){
    this.props.fetchProduct(1,8)
  }
  
  pagination = e => {
    const sort =  this.state.ascending === true? true: this.state.descending === true? false: undefined
    if(this.state.cricketBat === true){
      this.props.fetchBatProduct(e.target.value, 8, "cricketBat", sort, this.state.amount)
    }
    else if(this.state.cricketBall === true){
      this.props.fetchBatProduct(e.target.value, 8, "cricketBall", sort, this.state.amount)
    }
    else if(this.state.protection === true){
      this.props.fetchBatProduct(e.target.value, 8, "protection", sort, this.state.amount)
    }
    else if(this.state.cricketHelmet === true){
      this.props.fetchBatProduct(e.target.value, 8, "cricketHelmet", sort, this.state.amount)
    }
    else if(this.state.cricketBags === true){
      this.props.fetchBatProduct(e.target.value, 8, "cricketBags", sort, this.state.amount)
    }
    else if(this.state.searchProduct === true){
      this.props.fetchFuzzySearchProduct(e.target.value, 8, this.state.search, sort, this.state.amount)
    }
    else if(this.state.allProduct === true){
      this.props.fetchProduct(e.target.value, 8, sort, this.state.amount)
    }
  }

  handelBatCilck = e => {
    const category = e.target.name
    this.setState({cricketBat: false, cricketBall: false, allProduct: false, protection: false, cricketHelmet: false, cricketBags: false, searchProduct: false })
    this.setState({[e.target.name]: true})
    if(category === "allProduct"){
      this.props.fetchProduct(1,8, undefined, this.state.amount)
    }else{
      this.props.fetchBatProduct(1,8, category, undefined, this.state.amount)
    }
  }

  toggleSorting = () => this.setState({ sorting: !this.state.sorting })
  
  handelSearchProduct = e =>{
    e.preventDefault()
    this.setState({searchProduct: true, cricketBat: false, cricketBall: false, allProduct: false, protection: false, cricketHelmet: false, cricketBags: false,})
    this.props.fetchFuzzySearchProduct(1,8,this.state.search, undefined, this.state.amount)
  }
  
  handelChange = e => {
    if(e.target.name === "ascending"){
      this.setState({"descending": false})
    }
    else if(e.target.name === "descending"){
      this.setState({"ascending": false})
    }
    this.setState({ [e.target.name]: e.target.type === "checkbox"? e.target.checked : e.target.value })
  }

  handelSortFunc = () =>{
    setTimeout(()=>{
      const sort =  this.state.ascending === true? true: this.state.descending === true? false: undefined
      if(this.state.cricketBat === true){
        this.props.fetchBatProduct(1, 8, "cricketBat", sort, this.state.amount)
      }
      else if(this.state.cricketBall === true){
        this.props.fetchBatProduct(1, 8, "cricketBall", sort, this.state.amount)
      }
      else if(this.state.protection === true){
        this.props.fetchBatProduct(1, 8, "protection", sort, this.state.amount)
      }
      else if(this.state.cricketHelmet === true){
        this.props.fetchBatProduct(1, 8, "cricketHelmet", sort, this.state.amount)
      }
      else if(this.state.cricketBags === true){
        this.props.fetchBatProduct(1, 8, "cricketBags", sort, this.state.amount)
      }
      else if(this.state.searchProduct === true){
        this.props.fetchFuzzySearchProduct(1, 8, this.state.search, sort, this.state.amount)
      }
      else if(this.state.allProduct === true){
        this.props.fetchProduct(1, 8, sort, this.state.amount)
      }
    }, 2000)
  }

  handelSpecialChange = e =>{
    this.setState({ [e.target.name]: e.target.value})
    this.handelSortFunc()
  }

  render(){
    return (
      <div>
        <div className={style.parent} >
          <nav className={style.myNav} >
            <button style={{background: '#1cc7d0', color: "white", borderRadius: "25px" }} onClick={this.toggleSorting} className="no-focusborder" >Sort By Price</button>
            <Link style={{ color: '#1cc7d0' }} name="allProduct" onClick={this.handelBatCilck} className={style.myLink} to='/products' >All Products</Link>
            <Link style={{ color: '#1cc7d0' }} name="cricketBat" onClick={this.handelBatCilck} className={style.myLink} to='/products' >Cricket Bats</Link>
            <Link style={{ color: '#1cc7d0' }} name="cricketBall" onClick={this.handelBatCilck} className={style.myLink} to='/products' >Cricket Balls</Link>
            <Link style={{ color: '#1cc7d0' }} name="protection" onClick={this.handelBatCilck} className={style.myLink} to='/products' >Protection</Link>
            <Link style={{ color: '#1cc7d0' }} name="cricketHelmet" onClick={this.handelBatCilck} className={style.myLink} to='/products' >Cricket Helmets</Link>
            <Link style={{ color: '#1cc7d0' }} name="cricketBags" onClick={this.handelBatCilck} className={style.myLink} to='/products' >Cricket Bags </Link>
            <form onSubmit={this.handelSearchProduct} style={{position: "relative"}}>
              <input onChange={this.handelChange} value={this.state.search} style={{borderBottom: "2px solid black", borderTop: 0, borderRight: 0, borderLeft: 0, paddingLeft: 5}} name="search" placeholder="Search"  type="text"/>
              <img onClick={this.handelSearchProduct} style={{position: "absolute", right: 10, width: 25, height: 25}} src={SearchIco} alt="SportsVillaSearch"/>
            </form>
          </nav>   
        </div>     
        {this.state.sorting &&
          <div className={style.dropdown_content}>
            <h6>Price</h6>
            <input type="range" name="amount" onChange={this.handelSpecialChange}  min={100} max={50000} value={this.state.amount} className="range" />
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}} >
              <h6>₹ 100</h6>
              <h6>to</h6>
              <h6>₹ {this.state.amount!==999999999?this.state.amount: 50000 }</h6>
            </div>
            <label>
            <input type="checkbox" onClick={this.handelSortFunc} checked={this.state.ascending} onChange={this.handelChange} name="ascending"/> Low to high </label>
            <label>
            <input type="checkbox" onClick={this.handelSortFunc} checked={this.state.descending} onChange={this.handelChange} name="descending"/> High to low </label>
          </div>}
      <div className={style.products}>
        {this.props.product !== null
          ? this.props.product.map((product) => (
            <div key={product._id} className={style.ProductDiv} >
              <ProductList key={product._id} product={product} />
            </div>
            ))
          : <div className={style.loader}>Loading...</div>}
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
      {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)-1>0?parseInt(this.props.page)-1:1} onClick={this.pagination} >Prev</button>:null}
      {this.props.product !== null?(() => {
        const options = [];
        if(Math.ceil(this.props.count/8)<=10){
          for (let i=1; i <= Math.ceil(this.props.count/8); i++) {
            options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
              {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
              {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
          }
        }
        else if(Math.ceil(this.props.count/8)>10 && parseInt(this.props.page)+9<= Math.ceil(this.props.count/8)){
          console.log('hello form here')
          for (let i=parseInt(this.props.page); i <= parseInt(this.props.page)+9; i++) {
            options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
              {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
              {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
            }
          }
          else if(Math.ceil(this.props.count/8)>10 && parseInt(this.props.page)+9> Math.ceil(this.props.count/8)){
            console.log('hello form here as well')
            for (let i=Math.ceil(this.props.count/8)-9; i <= Math.ceil(this.props.count/8); i++) {
            options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
              {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
              {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
            }
          }
        return options;
        })(): null}
      {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)+1<Math.ceil(this.props.count/8)?parseInt(this.props.page)+1:Math.ceil(this.props.count/8)} onClick={this.pagination} >Next</button>:null}
      </div>
      </div>
    );
  }
}


const mapStateProp = stateStore => {
    return {
        product : stateStore.productState.products,
        count : stateStore.productState.count,
        page : stateStore.productState.page,
    }
}

export default  connect(mapStateProp , {fetchProduct, fetchBatProduct, fetchFuzzySearchProduct})(ProductReducer)
