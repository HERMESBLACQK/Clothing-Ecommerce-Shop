import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartItemsList = () => {
    
    const { cartItems } = useSelector(state => state.cart);

  return (
    <>
    <div className="p-1">

      {cartItems.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </div>
    </>
  )
}

export default CartItemsList