//import logo from './logo.svg';
//import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './routes/home/home';
import Nav from './routes/navigation/nav';
import Shop from './routes/shop/shop';
import Checkout from './routes/checkout/checkout';
import Authentication from './routes/authentication/authentication';
import { checkUserSession } from './store/user/user.action';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={ <Nav /> }>
        <Route index element={ <Home /> }/>
        <Route path='shop/*' element={ <Shop /> }/>
        <Route path='auth' element={ <Authentication /> }/>
        <Route path='checkout' element={ <Checkout /> }/>
      </Route>
    </Routes>
  );
};

export default App;
