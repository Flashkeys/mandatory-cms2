import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
                            {cart.map(cart => (
                                <tr>
                                    <img src={"http://192.168.99.100:8080/" + cart.Img.path}></img>
                                    <td>{cart.Name}</td>
                                    <td>{cart.Stock}</td>
                                    <td>{cart.Price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Cart