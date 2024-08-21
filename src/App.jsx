import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calcTotal, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const {cartItems, isLoading} = useSelector((store)=> store.cart);
  const {isOpen} = useSelector((store)=> store.modal);
  const dispatch = useDispatch();

  //This useEffect is for calculating the total
  useEffect(()=>{
    dispatch(calcTotal())
  }, [cartItems])

  //This one is getting the data after fetching and this useEffect will be rendered every time the app loads
  useEffect(()=>{
    dispatch(getCartItems())
  }, [])

  if(isLoading){
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  }
  else{
  return <main>
    {isOpen && <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>;
  }
}
export default App;
