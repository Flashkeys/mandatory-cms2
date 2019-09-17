import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(JSON.parse(localStorage.getItem("cart")) || []);


  function totalPrice() {

  }
  totalPrice();
  function removeCart() {
    localStorage.removeItem('cart');
    window.location.reload();
  }
  function removeItem(value) {
    const index = result.findIndex(cart => cart.Name === value.Name);
    const cart = [...result];
    if (index > -1) {
      cart.splice(index, 1);
      setResult(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }
  return (
    <div>
      <div className="container">
        <h2 className="text-center">Shopping Cart</h2>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/Cart">Shoping Cart</Link>
        </div>
        <div className="flex">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {result.length && result.map(cart => (
                <tr className="tr">
                  <img src={"http://192.168.99.100:8080/" + cart.Img.path}></img>
                  <td>{cart.Name}</td>
                  <td>{cart.Stock}</td>
                  <td>{cart.Price}</td>
                  <button className="btn-cart" onClick={() => removeItem(cart)}>Remove item</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <br></br>
          <button className="btn-sub" onClick={removeCart}>Empty cart</button>
          <h3>price = {price} $</h3>
          <button className="btn-sub">Buy now!</button>
          <div className="space"></div>
        </div>
      </div>
    </div>
  )
}
export default Cart