import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState(JSON.parse(localStorage.getItem("cart")) || []);


  function totalPrice() {

  }
  function removeCart() {
    localStorage.removeItem('cart');
    window.location.reload();
  }
  function removeItem(value) {
    const index = result.findIndex(cart => cart.Name === value.Name);
    const cart = [...result];
    if (index > -1) {
      cart.splice(index, 1);
      console.log(cart);
      setResult(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    console.log(index);
    
  }
  return (
    <div>
      <div className="text-center">
        <h2>Shopping Cart</h2>
        <br></br>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/Cart">Shoping Cart</Link>
        <div>
          <table>
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
                <tr>
                  <img src={"http://192.168.99.100:8080/" + cart.Img.path}></img>
                  <td>{cart.Name}</td>
                  <td>{cart.Stock}</td>
                  <td>{cart.Price}</td>
                  <button onClick={() => removeItem(cart)}>Remove item</button>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={removeCart}>Empty cart</button>
          <p>price = {price} $</p>
          <button>Buy now!</button>
        </div>
      </div>
    </div>
  )
}
export default Cart