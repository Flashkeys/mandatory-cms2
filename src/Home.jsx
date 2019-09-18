import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [results, setResult] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [initResult, setInitResult] = useState([]);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(1);
  const limit = 4;

  useEffect(() => {

    axios.get(`http://192.168.99.100:8080/api/collections/get/Produkt?limit=${limit}&skip=${limit * page - limit}`)
      .then(res => {
        console.log(res.data.entries);
        setResult(res.data.entries);
        setInitResult(res.data.entries);
        setMax(Math.floor(res.data.total / limit) + 1)
      })
      .catch(function (error) {
        alert('Error fetching the api')
      });

  }, [page]);

  function searchFilter(searchQuery) {
    const regex = new RegExp(searchQuery, "i");
    setFilterResult(results.filter(result => result.Name.match(regex)));
  }
  function showStock(checked) {
    if (checked) {
      setResult(results.filter(result => result.Stock > 0));
    } else {
      setResult(initResult)
    }
  }


  return (
    <div className="container">
      <h2 className="text-center">Home page</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Cart">Shoping Cart</Link>
      </div>
      <div className="text-center">
        <button onClick={() => setPage(page - 1)}>&lt;</button>
        <input type="number" min={1} max={max} value={page} />
        <button onClick={() => setPage(page + 1)}>&gt;</button>
      </div>
      <div className="text-center">
        <input type="text" placeholder="Search..." onChange={(e) => searchFilter(e.target.value)} />
        <br></br>
        In Stock : <input type="checkbox" onChange={(e) => showStock(e.target.checked)} />
      </div>
      <div className="posts">
        <div className="flex">
          <table className="table">
            <thead>
              <tr className="tr">
                <th></th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {filterResult.length ? filterResult.map((result) => (
                <tr key={result._id} className="tr">
                  <img src={"http://192.168.99.100:8080/" + result.Img.path}></img>
                  <td>{result.Name}</td>
                  <td>{result.Stock}</td>
                  <td>{result.Price}</td>
                  <td><Link to={`/Info/${result._id}`}>More info</Link></td>
                </tr>
              )) :
                results.map((result) => (
                  <tr key={result._id} className="tr">
                    <img src={"http://192.168.99.100:8080/" + result.Img.path}></img>
                    <td>{result.Name}</td>
                    <td>{result.Stock}</td>
                    <td>{result.Price}$</td>
                    <td><Link to={`/Info/${result._id}`}>More info</Link></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Home