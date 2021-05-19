import React from "react";
import Container from "react-bootstrap/Container";
import "./ImageSizes.css";
const ItemGrid = ({ foodItem, addProductsToCart }) => {
  return (
    <div className="card">
      <img src={foodItem.image} alt="" className="card-img-top packs" />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text"> £{foodItem.price}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addProductsToCart(foodItem)}
        >
          Add to cart
        </button>
      </div>
    </div>
    // <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //   <img src={foodItem.image} alt="" className="w-full" />

    //   <div className="px-6 py-4">
    //     <div className="font-bold text-purple-600 text-xl mb-2">
    //       {foodItem.name}
    //     </div>

    //     <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
    //       <p className="font-bold text-xl">£{foodItem.price}</p>
    //       <button
    //         onClick={() => addProductsToCart(foodItem)}
    //         className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
    //       >
    //         Add to cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ItemGrid;
