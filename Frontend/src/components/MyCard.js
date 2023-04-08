import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../style/mycard.css";

import { useCart, useDispatchCart } from "./ContextReuser";

function MyCard(props) {
  // from ContextReducer
  let dispatch = useDispatchCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [totalPrice, setTotalPrice] = useState(
    parseInt(Object.values(props.options)[0])
  );
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  let foodItem = props.foodItem;
  let data = useCart();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    // console.log(food);
    // console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: totalPrice,
          qty: quantity,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: foodItem.name,
          price: totalPrice,
          qty: quantity,
          size: size,
          img: props.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: foodItem.name,
      price: totalPrice,
      qty: quantity,
      size: size,
    });
  };

  useEffect(() => {
    setTotalPrice(quantity * parseInt(options[size]));
  }, [quantity, size, options]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceRef]);
  

  return (
    <div>
      <Card className="my-card mt-3">
        <Card.Img
          variant="top"
          src={props.foodItem.img}
          style={{ width: "260px", height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="card-title">{props.foodItem.name}</Card.Title>
          <div className=" container mt-2 mb-2">
            <Button className=" btn-in bg-info" onClick={handleDecrement}>
              -
            </Button>
            <text className="text">{quantity}</text>
            <Button className=" btn-in bg-info" onClick={handleIncrement}>
              +
            </Button>
            <select
              className="selected bg-info"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <Card.Text> Rs. {totalPrice.toFixed(2)}</Card.Text>
          </div>
          <hr />
        </Card.Body>
        <button
          className="btn btn-outline-info justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </Card>
    </div>
  );
}

export default MyCard;
