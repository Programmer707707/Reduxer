import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const handleModal = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    }
  return (
    <aside className='modal-container'>
        <div className="modal">
            <h4>Remove all items from shopping cart ?</h4>
            <div className='btn-container'>
                <button type='button' className='btn confirm-btn' onClick={handleModal}>Confirm</button>
                <button type='button' className='btn clear-btn'  onClick={()=> dispatch(closeModal())}>Cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal