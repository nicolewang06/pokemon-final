import React from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import About from './components/About'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import Play from './components/Play'
  
class App extends React.Component {
  render() {
     return (
      <Router>
        <Header />
         <Navigation />
         <Switch>
           <Route exact path="/">
             <About />
           </Route>
           <Route path="/pokedex"> 
             <Pokedex />
          </Route>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
        </Switch>
        <Footer />
    </Router>
  );
  }
}

export default App;