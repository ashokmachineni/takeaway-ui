import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartContext } from "../../CartProvider";
import db from "../../firebase.config";
import * as emailjs from "emailjs-com";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ show, handleClose }) => {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [paid, setPaid] = useState(false);

  const SERVICE_ID = "service_13td4o7";
  const TEMPLATE_ID = "template_or8rxkl";
  const USER_ID = "user_562kLwHNb0P0M4f7VgI3B";

  const changeQuantity = async (index, count) => {
    var items = [...cart];
    if (items[index].qty >= 1 && count > 0) {
      items[index].qty = count;
      setCart(items);
      localStorage.setItem("cart", JSON.stringify(items));
    }
  };

  const removeProduct = async (name) => {
    setCart(cart.filter((item) => item.name !== name));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item.name !== name))
    );
  };

  const calculateTotal = async () => {
    var tot = 0;
    cart.map((item) => {
      tot = tot + item.price * item.qty;
    });
    setTotal(tot);
    console.log(tot);
  };

  function sendEmail(orderID) {
    console.log(email);
    var data = {
      send_to: email,
      to_name: name,
      message: `Your order ID is ${orderID}, with the bill of £${total}`,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  const placeOrder = async () => {
    if (!name || !email || !cart || cart?.length < 1) {
      toast.error(`Could not Place order, Please fill up all the fields`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const orderID =
        "ORDER" +
        Math.floor(Math.random() * 1000000)
          .toString(36)
          .toUpperCase();
      const data = {
        orderID: orderID,
        products: cart,
        name: name,
        email: email,
        amount: total,
        orderDate: new Date(),
      };
      await db
        .collection("orders")
        .add(data)
        .then((doc) => {
          if (doc.id) {
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
            setName(null);
            setEmail(null);
            handleClose();
            toast.success(`Order Placed`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setPaid(false);
            sendEmail(orderID);
          }
        });
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const generateToken = (token) => {
    if (token) {
      setPaid(true);
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th width="50"></th>
              <th>#</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, index) => (
              <tr>
                <td>
                  <Button
                    className="px-2 ml-1 py-1"
                    size="sm"
                    variant="danger"
                    onClick={() => removeProduct(item.name)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </td>
                <td width={80} className="p-1">
                  <img className="img-fluid" src={item.image} />
                </td>
                <td>{item.name}</td>
                <td className="d-flex">
                  {item.qty}
                  <div className="flex-grow-1" />
                  <Button
                    className="px-2 ml-1 py-1"
                    size="sm"
                    variant="info"
                    onClick={() => changeQuantity(index, item.qty - 1)}
                  >
                    -
                  </Button>
                  <Button
                    className="px-2 ml-1 py-1"
                    size="sm"
                    variant="info"
                    onClick={() => changeQuantity(index, item.qty + 1)}
                  >
                    +
                  </Button>
                </td>
                <td>
                  {item.price}*{item.qty}
                </td>
                <td>{item.price * item.qty}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {!paid && (
          <StripeCheckout
            stripeKey="pk_test_51IkooNIH3wfEIiBR62p76upD4nOgmqFKTfV3qZKCabsc5H6E0lCxhZ16KnvzyKknVyeNKyTGlRIbAEsesm6J3QDV00yU22dkoT"
            name="OrderPayment"
            amount={total * 100}
            token={generateToken}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          disabled={!cart || cart.length < 1 || !paid}
          variant="primary"
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;
