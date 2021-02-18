import React from 'react'
import axios from 'axios'

const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Play extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          plays: [],
          results: [],
          score: [],
          selected: []
        }
      }

    async componentDidMount() {
       try {
        const random = Math.floor(Math.random() * 152)
           const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);
           this.setState({ plays: res.data })

      } catch(err) {
          console.error(err.message);
  }
}      
  async getValue(e) {
    const answer = document.querySelector('#playImage');
    const allCaps = this.state.plays.name.toUpperCase();
    
    if (this.state.plays.name === e.target.value) {
      answer.style.filter = "brightness(100%)";
      alert("CORRECT!! You caught " + allCaps + "!!  Check out the Pokemon page to give your new friend a nickname");
      
      
    } else {
      alert("oops, wrong guess. try again");
    }
}

    render() {
        return (
            <div className="playContainer">
              <div id="playContent">
                <div className="playTitle">&nbsp; Who's that Pok&#233;mon ? &nbsp;</div><br></br>
                  <div id="playImage"><img src={img + this.state.plays.id + ".png"} alt="" width="250px" /></div><br></br>
                      <div id="nameContainer">
                      <div className='row'>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.getValue(e, 'value')} value={this.state.plays.name} key={this.state.plays.id}/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.getValue(e, 'value')} value="pikachu" key={this.state.plays.id}/>
                          </div>

                        </div>
                        <div className='row'>
                        <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.getValue(e, 'value')} value="eevee" key={this.state.plays.id}/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.getValue(e, 'value')} value="snorlax" key={this.state.plays.id}/>
                          </div>

                        </div>
                      </div>
                      <div id="hintTypeContainer">
                        <div id="hintType">{this.state.plays.types && this.state.plays.types.map(type => {
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