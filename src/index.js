import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home.jsx';
import Info from './Info.jsx';
import Cart from './Cart.jsx';
import NotFound from './NotFound.jsx';

const Index = () => {
  const [cart, setCart] = useState([]);
  console.log(cart);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Info/:id" render={(props) => <Info {...props} cart={cart} setCart={setCart} />} />
        <Route path="/Cart" render={() => <Cart cart={cart} setCart={setCart} />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
ReactDOM.render(<Index />, document.getElementById('root')); 