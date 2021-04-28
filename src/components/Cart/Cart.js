import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CartEmpty from "./cartempty.png";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";
import { CartContext } from "../../CartProvider";
import Checkout from "./Checkout";
function Cart() {
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const clickCart = () => {
    setShowCart(true);
  };
  const hideCart = () => {
    setShowCart(false);
  };
  return (
    <div>
      <button
        onClick={clickCart}
        className="bg-transparent link hover:bg-transparent text-white font-bold py-2 px-4 rounded-full"
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        <Badge variant="info" className="cart-badge">
          {cart.length}
        </Badge>
      </button>
      <Checkout show={showCart} handleClose={hideCart} />
    </div>
  );
}

export default Cart;
