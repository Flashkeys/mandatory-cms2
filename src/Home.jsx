import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [results, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const limit = 4;

  useEffect(() => {
    if (inputValue) {
      axios.get(`http://192.168.99.100:8080/api/collections/get/Produkt?filter[Name][$regex]=${inputValue}`)
        .then(res => {
          setResult(res.data.entries);
          setMax(Math.floor(res.data.total / limit) + 1)
        })
        .catch(function (error) {
          alert('Error fetching the api')
        });
    } else if (checked) {
      axios.get("http://192.168.99.100:8080/api/collections/get/Produkt?filter[Stock][$regex]=[1-9]")
        .then(res => {
          setResult(res.data.entries);
          setMax(Math.floor(res.data.total / limit) + 1)
        })
        .catch(function (error) {
          alert('Error fetching the api')
        });
    } else {
      axios.get(`http://192.168.99.100:8080/api/collections/get/Produkt?limit=${limit}&skip=${limit * page - limit}`)
        .then(res => {
          console.log(res.data.entries);
          setResult(res.data.entries);
          setMax(Math.floor(res.data.total / limit) + 1)
        })
        .catch(function (error) {
          alert('Error fetching the api')
        });
    }

  }, [page, inputValue, checked]);


  return (
    <div className="container">
      <h2 className="text-center">Home page</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Cart">Shoping Cart</Link>
      </div>
      <div className="text-center">
        <button onClick={() => setPage(page - 1)}>&lt;</button>
        <input type="number" min={1} max={max} value={page}/>
        <button onClick={() => setPage(page + 1)}>&gt;</button>
      </div>
      <div className="text-center">
        <input type="text" placeholder="Search..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <br></br>
        In Stock : <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
      </div>
      <div className="home-container">
        {results.map((result) => (
          <div key={result._id} className="home-row">
            <img className="home-pic" alt="pic" src={"http://192.168.99.100:8080/" + result.Img.path}></img>
            <div className="home-info">
            <span>{result.Name}</span>
            <span>{result.Stock} in stock</span>
            <span>{result.Price}$</span>
            <span><Link to={`/Info/${result._id}`}>More info</Link></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home