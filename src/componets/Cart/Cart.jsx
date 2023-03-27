import React from 'react';
import './Cart.css'

const Cart = (props) => {

  const {cart }=  props
  // const total = cart.reduce(((initialValue, cart)=> initialValue +cart.price ),0)
  let totalPrice = 0;
  let totalShipping =0; 
  for (const product of cart){
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping
  }
  const tax = totalPrice*7/100;
  const grandTotal = totalPrice + totalShipping + tax; 

  return (
    <div className='cart'>
         <h4>order Summary</h4>
        <p>Selected Items:{cart.length} </p>
        <p>Total Price:${totalPrice.toFixed(2)}</p>
        <p>Total Shipping:${totalShipping.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)} </p>
        <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
    </div>
  );
};

export default Cart;