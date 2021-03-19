 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './component/lista';
 import * as serviceWorker from './serviceWorker';

 import Lista from "./component/lista";
 import Component from "./component/component";

 import { Route, BrowserRouter, Switch } from "react-router-dom";

 const Routes = () =>(
     <BrowserRouter>
         <Switch>
             <Route path='/' component={Lista} />
             <Route path='/home' component={Component} /> 
         </Switch>
     </BrowserRouter>
 )

 ReactDOM.render(<Routes />, document.getElementById('root'));
    
 // If you want your app to work offline and load faster, you can change
 // unregister() to register() below. Note this comes with some pitfalls.
 // Learn more about service workers: https://bit.ly/CRA-PWA
 serviceWorker.unregister();
