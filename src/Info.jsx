import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <div className="text-center">
                <h2>Details Page</h2>
                <br></br>
                <Link to="/">Home</Link>
                <br></br>
                <Link to="/Cart">Shoping Cart</Link>
            </div>
            {!result ? <p>Loading...</p> : <ul>
                <li><img src={"http://192.168.99.100:8080/" + result.Img.path}></img></li>
                <li>{result.Name}</li>
                <li>{result.Desc}</li>
                <li>Price : {result.Price}$</li>
                <li>Stock : {result.Stock}</li>
                <button onClick={addCart}>Add to cart</button>
            </ul>}

        </div>
    )
}
export default Info