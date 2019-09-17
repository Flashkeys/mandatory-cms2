import React from 'react';
import { Link } from 'react-router-dom';

function Produkt(props) {
    return (
        <div className="Product">
            <tr key={result._id}>
                <td><img src={"http://192.168.99.100:8080/" + result.Img.path}></img></td>
                <td>{result.Name}</td>
                <td>{result.Price}$</td>
                <td>{result.Stock}</td>
                <td><Link to={`/Info/${result._id}`}>More info</Link></td>
            </tr>
        </div>
    );
}

export default Produkt;
/*
<Link className="Product-header" to={`/detaljer/${props.id}`} >{props.name}</Link>
    <img className="Product-image" src={props.imageUrl} alt={`Picture of ${props.name}`} />
    <p className="Product-price">{props.price} kr</p>
    <p className="Product-stock">{props.stock} i lager</p>

*/