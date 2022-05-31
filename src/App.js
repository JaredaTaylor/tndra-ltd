//import logo from './logo.svg';
//import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home';
import Nav from './routes/navigation/nav';
import Shop from './routes/shop/shop';
import SignIn from './routes/sign-in/sign-in';

const App = () => {

  // place categories object here potentially

  return (
    <Routes>
      <Route path='/' element={ <Nav /> }>
        <Route index element={ <Home /> }/>
        <Route path='shop' element={ <Shop /> }/>
        <Route path='sign-in' element={ <SignIn /> }/>
      </Route>
    </Routes>
  );
};

export default App;
