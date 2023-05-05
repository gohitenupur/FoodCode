import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReuser";

function Cart() {
  let cart = useCart();
  let dispatch = useDispatchCart();

  if (cart.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }

  let totalPrice = cart.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    // Implement checkout logic here
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`http://localhost:5000/api/order-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_data: cart,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    // console.log("Order response ",response)
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
      <h2>Your Cart</h2>
      <table className="table table-hover ">
        <thead className="text-info fs-4">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.size}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info p-0"
                  onClick={() => {
                    dispatch({ type: "REMOVE", idx: idx });
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <div>
          <h1 className="fs-3">Total Price : {totalPrice}/-</h1>
        </div>
      </table>
      {cart.length > 0 && (
        <button className="btn btn-info" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
