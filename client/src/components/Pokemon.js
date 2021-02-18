import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

//const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Pokemon extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [] }
    }

    async componentDidMount() {
      try{
      const {data} = await axios.get('http://localhost:8080/pokemon')
      this.setState ( { data: data } )
      //console.log(data)
    } catch(error) {
      console.error(error.message);
    }
    }

    async deletePokemon(id) {
        try {
          const res = await axios.delete('http://localhost:8080/pokemon/' + id);
          //console.log(res.data);
          alert("this will release pokemon back in the wild");
        } catch(e) {
          console.error(e, e.message);
        }
      }

      async editPokemon(id) {
        try {
          //const res = await axios.patch('http://localhost:8080/pokemon/' + id);
          console.log(id);
          alert("give nickname");
        } catch(e) {
          console.error(e, e.message);
        }
      }

    render() {

        return(
        <div id = "holder">
            <div className="pokemonCardContainer">  
                    {
                    this.state.data && this.state.data.map(data => (
                        
                        <div className="pokemonCard" key={data.id}>  
                            <div className="pokemonBackground" >
                                <div id="delete" onClick={ (e) => this.deletePokemon(data.id) }>❌</div>
                                <img id="pokemonImage" src= {data.imageUrl + ".png"} alt="" width="150px" />
                                <div id="pokemonNum">#{data.pokemonNum}</div>
                            </div> 

                            <div className="pokemonContent">
                                
                                <div id="pokemonNameContent">
                                    <div id="edit" onClick={ (e) => this.editPokemon(data.id) }>✏️</div>
                                    <div id="pokemonName">
                                        {data.pokemonName}<br></br>
                                        {data.nickname}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
            </div>
        </div>
)
}
}

export default Pokemon