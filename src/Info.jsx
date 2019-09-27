import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Info = (props) => {
    const [result, setResult] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.99.100:8080/api/collections/get/Produkt?filter[_id]=${props.match.params.id}`)
            .then((res) => setResult(res.data.entries[0]));

    }, []);

    useEffect(() => {
        axios.get(`http://192.168.99.100:8080/api/collections/get/Comment`)
            .then((res) => setComment(res.data.entries));

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
            {!result ? <span>Loading...</span> : <div className="info-table">
                <span className="info-name">{result.Name}</span>
                <img className="main-pic" src={"http://192.168.99.100:8080/" + result.Img.path}></img>
                {result.Gallery.map(item => <img className="gallery-pic" src={"http://192.168.99.100:8080" + item.path} />)}
                <br></br>
                <span className="info-desc">{result.Desc}</span>
                <div className="info-container">
                <span className="info-price">Price : {result.Price}$</span>
                <span className="info-stock">Stock : {result.Stock}</span>
                <button onClick={addCart} className="info-btn">Add</button>
                </div>
            </div>}

            <div className="comments">
                {
                    comment && result ?
                        comment.map((x) => {
                            if (x.Produkt.display === result.Name) {
                                console.log(x)
                                return (
                                    <div className="comment-row">
                                        <span className="comment-text">{x.Name}</span>
                                        <span className="comment-text">{x.Text}</span>
                                        <span className="comment-text">{x.Rating}/5</span>
                                    </div>
                                )
                            }
                        }) : null
                }

            </div>

        </div>
    )
}
export default Info