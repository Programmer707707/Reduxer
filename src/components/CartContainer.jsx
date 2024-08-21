import React from 'react'
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
    const dispatch = useDispatch();
    
    const {amount, total, cartItems} = useSelector((store)=> store.cart);
    console.log(cartItems);
    if(cartItems.length < 1){
        return (
            <section className='cart'> 
            <header>
                <h2>Your bag</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
            </section>
        )
    }
    return(
        
        <section className='cart'>
            <header>
                <h2>Your bag</h2>
            </header>

            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />
                })}
            </div>

            <footer>
                <hr />
                <div className="cart-total">
                    <h4>total <span>${total}</span></h4>
                </div>

                <button className='btn clear-btn'
                onClick={()=> dispatch(openModal())}  
                >Clear cart</button>
            </footer>
        </section>
    )
}

export default CartContainer