import React, {Component} from 'react'
import axios from 'axios'

const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Pokemon extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [] }
    }
  
    async componentDidMount() {
      try{
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        this.setState( { data: res.data.results } )
        
      } catch(error) {
        console.error(error.message);
      }
    }

    render() { 
      return ( 
        <div id="holder">
           {this.state.data.map(pokemon => 
         <PokemonDisplay
            name={pokemon.name} 
            url={pokemon.url}/> 
          )}
        </div>
       );
    }
  }

  class PokemonDisplay extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {data:[]}
    }

    async componentDidMount() {
      try{
      const {data} = await axios.get(this.props.url)
      this.setState ( { data: data } )
    } catch(error) {
      console.error(error.message);
    }
    }

    render() {


      
      return(
        <div className="pokemonCardContainer">
          
          <div className="pokemonCard">           

              <div className="pokemonBackground"  key={this.state.data.id}>
                <img id="pokemonImage" src= {img + this.state.data.id + ".png"} alt="" width="150px" />
              </div> 

              <div className="pokemonContent">
              <h2 id="pokemonName">#{this.state.data.id} {this.state.data.name}</h2>
              



              


              </div>{/* closing pokemonContent */} 
          </div>
        </div>
        )
      }
      }

export default Pokemon