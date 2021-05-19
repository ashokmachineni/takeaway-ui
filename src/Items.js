import React, { useState, useEffect, useContext } from "react";
import db from "./firebase.config";
import ItemGrid from "./ItemGrid";
import { ToastContainer, toast } from "react-toastify";
import { STORAGE_ITEMS_CART } from "./utils/Constants";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "./CartProvider";
import "./Items";
function Items() {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { cart, setCart } = useContext(CartContext);

  console.log(foodItems);

  const addProductsToCart = (cartItem) => {
    if (cart && cart.find((item) => item.name === cartItem.name)) {
      toast.warning(
        `${cartItem.name} is already in the cart, go to cart to update quantity`,
        {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      const item = {
        name: cartItem.name,
        price: cartItem.price,
        image: cartItem.image,
        qty: 1,
      };
      setCart([...cart, item]);
      localStorage.setItem("cart", JSON.stringify([...cart, item]));
      toast.success(`${item.name} added to cart successfully`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setFoodItems(snapshot.docs.map((doc) => doc.data()));
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 tops">
      {foodItems.map((foodItem) => (
        <ItemGrid
          key={foodItem.name}
          foodItem={foodItem}
          isLoading={isLoading}
          addProductsToCart={addProductsToCart}
        />
      ))}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Items;
