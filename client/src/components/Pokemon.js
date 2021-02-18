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
      const {data} = await axios.get('http://localhost:8080/pokemon')
      this.setState ( { data: data } )
    } catch(error) {
      console.error(error.message);
    }
    }

    render() {

        return(
        <div id = "holder">
            <div className="pokemonCardContainer">  
                    {
                    this.state.data && this.state.data.map(data => (
                        
                        <div className="pokemonCard">  
                            <div className="pokemonBackground" key={data.id}>
                                <div id="delete">❌</div>
                                <img id="pokemonImage" src= {data.imageUrl + ".png"} alt="" width="150px" />
                                <div id="pokemonNum">#{data.pokemonNum}</div>
                            </div> 

                            <div className="pokemonContent">
                                
                                <div id="pokemonNameContent">
                                    <div id="edit">✏️</div>
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