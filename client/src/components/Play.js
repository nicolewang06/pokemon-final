import React from 'react'
import axios from 'axios'

const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Play extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      results: [],
      score: [],
      selected: []
    }
  }

  

  async componentDidMount() {
    try {
      const random = Math.floor(Math.random() * 899)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);
        const pNames = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=899');
        this.setState({ details: res.data, testing: pNames.data })
    } catch(err) {
        console.error(err.message);
    }
  }      

  async guess(e) {
    const answer = document.querySelector('#playImage');
    const allCaps = this.state.details.name.toUpperCase();
    
    if (this.state.details.name === e.target.value) {
      answer.style.filter = "brightness(100%)";
      alert("💥 You caught " + allCaps + " !! 🎉\n\nCheck out the Pokemon page to give your new friend a nickname \n\n\n-- refresh page to encounter another Pokemon --");

      const res = await axios.post('http://localhost:8080/pokemon', {
        pokemonNum: this.state.details.id,
        pokemonName: this.state.details.name,
        imageUrl: `${img}${this.state.details.id}`
      });
    } else {
      alert("nope \nit got away");
      this.componentDidMount();
      answer.style.filter = "brightness(0%)";
    }
  }

    render() {
        return (
            <div className="playContainer">
              <div id="playContent">
                <div className="playTitle">&nbsp; Who's that Pok&#233;mon ? &nbsp;</div><br></br>
                  <div id="playImage"><img src={img + this.state.details.id + ".png"} alt="" width="250px" /></div><br></br>
                      <div id="nameContainer">
                      <div className='row'>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value={this.state.details.name} key={this.state.details.id}/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value="pikachu" key="a"/>
                          </div>

                        </div>
                        <div className='row'>
                        <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value="eevee" key="b"/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value="snorlax" key="c"/>
                          </div>

                        </div>
                      </div>
                      <div id="hintTypeContainer">
                        <div id="hintType">{this.state.details.types && this.state.details.types.map(type => {
                            return (<div>{type.type.name} type</div>); })}
                        </div>
                        mouse over to show hint
                      </div>
              </div>
            </div>
        )
    }
}

export default Play