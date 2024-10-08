import React from 'react'
import { ChevronUp, ChevronDown } from '../icons'
import { removeItem, incAmount, decAmount } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'


const CartItem = ({id, title, img, price, amount}) => {
  
  const dispatch = useDispatch();
  return (
    <article className='cart-item'>
        <img src={img} alt={title} />
        <div>
            <h4>{title}</h4>
            <h4 className="item-price">${price}</h4>
            <button className='remove-btn' 
            onClick={()=>dispatch(removeItem(id))}
            >Remove</button>
        </div>

        <div>
            <button className='amount-btn' onClick={()=> dispatch(incAmount(id))} > <ChevronUp/> </button>
            <p className='amount' >{amount}</p>
            <button className='amount-btn' onClick={()=> dispatch(decAmount(id))} > <ChevronDown/> </button>
        </div>
    </article>
  )
}

export default CartItem