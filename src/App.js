import React from 'react';
import './App.css';
//import {Product} from './Product.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/ToDo/ToDo';

function App() {
  return (
    /*<div className="App">
       <Product defaultValue= {"5$"}  description = " Fresh bananas from Ecuador" name=" banabas"/>
    </div>*/
    <div className="App">
    <div>todo list</div>
      <ToDo />
      </div>  
  );
}

export default App;