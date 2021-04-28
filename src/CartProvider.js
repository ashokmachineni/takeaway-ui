import React, { useEffect, useState, createContext } from "react";

export const CartContext = createContext({ cart: [] });

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const { children } = props;

  useEffect(() => {
    const cartLocal = localStorage.getItem("cart");
    if (cartLocal) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
