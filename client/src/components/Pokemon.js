import React, {Component} from 'react'
import axios from 'axios'

const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Pokemon extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [] }
    }
//     render() { 
//       return ( 
//         <div id="holder">
//            {this.state.pokemonCard.map(pokemon => 
//          <PokemonDisplay
//             name={pokemon.name} 
//             url={pokemon.url}/> 
//           )}
//         </div>
//        );
//     }
//   }

//   class PokemonDisplay extends React.Component {
//     constructor(props) {
//       super(props);
      
//       this.state = {data:[]}
//     }

    async componentDidMount() {
      try{
      const {data} = await axios.get('http://localhost:8080/pokemon')
      
      this.setState ( { data: data } )

      console.log(data)
    //   console.log(this.state.data[0].pokemonNum)
    //   console.log(this.state.data[0].pokemonName)
    //   console.log(this.state.data[0].imageUrl)
    } catch(error) {
      console.error(error.message);
    }
    }

    render() {


      
return(


<div className="pokemonCardContainer">
             
        {
        this.state.data && this.state.data.map(data => (
            
            <div className="pokemonCard">  
                <div className="pokemonBackground"  key={data.id}>
                    <img id="pokemonImage" src= {data.imageUrl + ".png"} alt="" width="150px" />
                </div> 

                <div className="pokemonContent">
                <h2 id="pokemonName">#{data.id} {data.pokemonName}</h2>
                </div>
            </div>
        ))
        }

    
</div>
)
}
}

export default Pokemon