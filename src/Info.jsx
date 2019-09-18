import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Comments from "./Comments";

const Info = (props) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.99.100:8080/api/collections/get/Produkt?filter[_id]=${props.match.params.id}`)
            .then((res) => setResult(res.data.entries[0]));
    }, []);
    function addCart() {
        props.setCart([...props.cart, result]);
        alert("added to cart");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("THIS ONE HERE" + cart);

        cart.push(result);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return (
        <div className="container">
            <h2 className="text-center">Details Page</h2>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/Cart">Shoping Cart</Link>
            </div>
            <table className="table">
                <tbody>
                    {!result ? <p>Loading...</p> : <tr className="tr">
                        <td><img src={"http://192.168.99.100:8080/" + result.Img.path}></img></td>
                        <td><img src={"http://192.168.99.100:8080/" + result.Gallery.path}></img></td>
                        <td>{result.Name}</td>
                        <td>{result.Desc}</td>
                        <td>Price : {result.Price}$</td>
                        <td>Stock : {result.Stock}</td>
                        <button onClick={addCart} className="btn">Add</button>
                    </tr>}
                </tbody>
            </table>

        </div>
    )
}
export default Info