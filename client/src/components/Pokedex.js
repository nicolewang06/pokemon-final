import React, {Component} from 'react'
import axios from 'axios'

const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"


class Pokedex extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [] }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
      const { name, value } = e.target;
      this.setState ( { [name]: value } );
    }

    async handleSubmit(e) {
      e.preventDefault();
      const pokemon = this.state.search;

      try{
        const resInput = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        this.setState( { data: resInput.data } )
      } catch(er) {
        console.error(er.message);
      }
    }

    async componentDidMount() {
      try{
        const randoms = Math.floor(Math.random() * 899)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randoms}`)
        //console.log(res)
        this.setState( { data: res.data } )
      } catch(error) {
        console.error(error.message);
      }
    }
  
    render() { 
      return ( 
        <div className="pokedexPageContainer">

          <div className = "pokedexSearchBar">
            <form 
                id="searchBar"
                onChange={this.handleChange}
                onClick={this.handleSubmit}>
                  <input type="text" name="search" id="search" placeholder="enter Pok&#233;mon name or # between 1 - 898" size="43" />
                  &nbsp;&nbsp;<input type="submit" id="searchButton" value="who's that Pok&#233;mon ?"  />
            </form> 
          </div>

           <div className="pokedex">
             {/* ------ left side of pokedex -------- */}
              <div className="leftSide">

                <div className="topLightsContainer">
                    <div id="blueLight"></div>
                    <div id="blueDark"></div>
                    <div id="blueHighlight"></div>
                    <div id="redLight"></div>
                    <div id="yellowLight"></div>
                    <div id="greenLight"></div>
                 </div>

                 <div id="topLine"></div>
                 <div id="topLine2"></div>

              <div className="imgContainer">
                <div id="redDot1"></div>
                <div id="redDot2"></div>
                <div className="imgDisplay">
                  <img src= {sprite + this.state.data.id + ".png"} alt="sprite"  />
                </div>
                <div id="bottomLeftDot"></div>

                <div id="bottomRightLine1"></div>
                <div id="bottomRightLine2"></div>
                <div id="bottomRightLine3"></div>
              </div>

              <div id="bottomCorner"></div>

              <div id="blkLeftButton"></div>
              <div id="redLine"></div>
              <div id="blueLine"></div>
              <div id="greenDisplay"><p id="pokedexID">#{this.state.data.id}</p></div>
              <div className="dPad">
                <div id="up">
                  <div id="upButton"></div>
                </div>
                <div id="right">
                <div id="rightButton"></div>
                </div>
                <div id="left">
                <div id="leftButton"></div>
                </div>
                <div id="down">
                <div id="downButton"></div>
                </div>
              </div>

              </div>

              {/* ------ pokedex divider -------- */}
              <div className="middleDivider">
                <div id="hinge1"></div>
                <div id="hinge2"></div>
              </div>

              {/* ------ right side of pokedex -------- */}
              <div className="rightSide">

                  <div id="topRightLine"></div>
                  <div id="topRightLine2"></div>
                  <div id="blankSection"></div>
                  <div id="blankSection2"></div>
                  <div id="blankSection3"></div>

                <div id="detailsBox"><p id="pokedexName">{this.state.data.name}</p></div>
                  <div className="blueButtonContainer">
                    <div className="topBlueButtonRow">
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                    </div> 
                    <div className="bottomBlueButtonRow">
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                      <div className="blueButton"></div>
                    </div>  
                  </div>  

                    <div className="blackSideButtonContainer">
                      <div id="blackSideButton1"></div>
                      <div id="blackSideButton2"></div>
                    </div>
                    <div className="whiteButtonContainer">
                      <div id="whiteButton1"></div>
                      <div id="whiteButton2"></div>
                    </div>

                    <div className="yellowRightCircle">
                      <div id="yellowRightCircleDark"></div>
                      <div id="yellowRightCircleHighlight"></div>
                    </div>

                    <div className="pokedexBottomRight">
                      <div id="leftBottom">Height:<br></br> {this.state.data.height}</div>
                      <div id="rightBottom">Weight:<br></br> {this.state.data.weight}</div>
                    </div>
                  </div> 
           </div>
        </div>
       );
    }
  }

export default Pokedex