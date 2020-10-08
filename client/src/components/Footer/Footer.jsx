import React, { Component } from 'react'
import style from "./Footer.module.css"
import facebook from "../../images/face.png"
import instagram from "../../images/instagram.png"
import twitter from "../..//images/twitter.png"

class Footer extends Component {
    render() {
        return (
            <div className={style.ParentFooter} >
            <div style={{background: "#1cc7d0" ,textAlign:"center"}}>
                <div className={style.footer}>
                <div>
                <h3 style={{fontSize:"bold" ,textAlign:"left"}}>About Us</h3>
                <p style={{textAlign:"left"}}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Veritatis error tempora qui voluptatum consequuntur
                  praesentium repellendus excepturi debitis. Repellendus
                  dignissimos qui rerum, neque sit quisquam odit doloribus ipsa
                  quod sunt consequatur expedita corporis delectus laborum,
                  corrupti accusamus voluptates blanditiis pariatur ea ex
                  numquam! Veniam, rem tempora cupiditate reiciendis eligendi
                  animi!
                </p>
              </div>
              <div>
                <h3 style={{textAlign:"left"}}>Address</h3>
                <p style={{textAlign:"left"}}>
                  Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer
                  Ring Road, Devarabeesanahalli Village, Surat, 560103,
                  Gujarat, India
                </p>
              </div>
                </div>
                <div style={{marginTop:"50px"}}>
                    <img className={style.iconDiv} src={facebook} alt=""/>
                    <img className={style.iconDiv} src={instagram} alt=""/>
                    <img className={style.iconDiv} src={twitter} alt=""/>    
                </div>
                <div style={{marginTop:"25px"}}>
                    <p style={{color:"white", margin: 0 }} >Copyright © 2020, Sports-Villa Pvt. Ltd.</p>
                </div>
            </div>
          </div>
        );
    }
}

export default Footer
