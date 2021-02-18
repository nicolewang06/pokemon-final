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
  constructor() {
    super();

    this.state = { data: [] }
  }

  async componentDidMount() {
    try{
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      //const resDatabase = await axios.get('http://localhost:8080/pokemon')
      this.setState( { data: res.data.results } )
      // this.setState( { pData: resDatabase.data.results})
      
    } catch(error) {
      console.error(error.message);
    }
  }

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
             <Pokedex pokemonList={this.state.data}/>
          </Route>
          <Route path="/pokemon">
            <Pokemon /*pokemonCard={this.state.pData}*/ />
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