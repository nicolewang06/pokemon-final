import React from 'react'
import axios from 'axios'

const img = "https://pokeres.bastionbot.org/images/pokemon/"
// const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon"
const deploySite = "http://localhost:8080/pokemon/"


class Play extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      correct: [],
      randomNameOne: [],
      randomNameTwo: [],
      randomNameThree: []
    }
  }

  async componentDidMount() {
    try {

      const random = Math.floor(Math.random() * 899)
      const randomOne = Math.floor(Math.random() * 899)
      const randomTwo = Math.floor(Math.random() * 899)
      const randomThree = Math.floor(Math.random() * 899)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);
        //const pNames = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=899');
        const randomNameOne = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomOne}`);
        const randomNameTwo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomTwo}`);
        const randomNameThree = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomThree}`);
        this.setState({ correct: res.data, randomNameOne: randomNameOne.data, randomNameTwo: randomNameTwo.data, randomNameThree: randomNameThree.data })

    } catch(err) {
        console.error(err.message);
    }
  }      

  async guess(e) {
    const answer = document.querySelector('#playImage');
    const allCaps = this.state.correct.name.toUpperCase();
    
    if (this.state.correct.name === e.target.value) {
      answer.style.filter = "brightness(100%)";
      alert("💥 You caught " + allCaps + " !! 🎉\n\nCheck out the Pokemon page to give your new friend a nickname \n\n\n-- refresh page to encounter another Pokemon --");

      const res = await axios.post(deploySite, {
        pokemonNum: this.state.correct.id,
        pokemonName: this.state.correct.name,
        imageUrl: `${img}${this.state.correct.id}`
      });
    } else {
      alert("nope");
      this.componentDidMount();
      answer.style.filter = "brightness(0%)";
    }
  }

    render() {
        return (
            <div className="playContainer">
              <div id="playContent">
                <div className="playTitle">&nbsp; Who's that Pok&#233;mon ? &nbsp;</div><br></br>
                  <div id="playImage"><img src={img + this.state.correct.id + ".png"} alt="" width="250px" /></div><br></br>
                      <div id="nameContainer">
                      <div className='row'>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value={this.state.correct.name} key={this.state.correct.id}/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value={this.state.randomNameOne.name} key={this.state.randomNameOne.id}/>
                          </div>

                        </div>
                        <div className='row'>
                        <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value={this.state.randomNameTwo.name} key={this.state.randomNameTwo.naidme}/>
                          </div>
                          <div className='column'>
                            <input type="button" className='playName' onClick={(e) => this.guess(e, 'value')} value={this.state.randomNameThree.name} key={this.state.randomNameThree.id}/>
                          </div>

                        </div>
                      </div>
                      <div id="hintTypeContainer">
                        <div id="hintType">{this.state.correct.types && this.state.correct.types.map(type => {
                            return (<div>{type.type.name} type</div>); })}
                        </div>
                        mouse over to show hint
                      </div>
              </div>

        <div>
          <ul>
            {/* {this.state.nameAndUrl.map(item => (
              <li key={item}>{item}</li>
            ))} */}
          </ul>
        </div>

            </div>
        )
    }
}

export default Play