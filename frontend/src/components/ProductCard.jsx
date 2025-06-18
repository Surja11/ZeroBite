import React from "react";
import './ProductCard.css'
import timer from '../assets/Zerobite images/expiry.png'
import cartIcon from '../assets/Zerobite images/cartIcon.svg'
import kitkat from '../assets/Zerobite images/kitkat.jpg';

const Card = () => {
    return (
        <div className="card-container">
            <div className="img-container">
                <img src={kitkat} alt="product image" />
            </div>
            <div className="content">
                <h2>Rs.200</h2>
                <h1>Cake</h1>
                <div className="btn">
                    <button className=" cart-button" style={{ backgroundColor: "#AEB18A" }}><img className="small-cart" src={cartIcon} alt="" /></button>
                    <button className=" expiry-button"><img className="expiry-button" src={timer} alt="hourglass with clock" /> <p>8hr</p></button>
                </div>
                <div className="card-footer">
                    <div className="rating">⭐(4.2)</div>
                    <div className="address" style={{color:"gray"}}>| Bhaktapur</div>
                </div>


            </div>

        </div>
    )
}
export default Card;