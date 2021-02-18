import React, { Component } from 'react'

class About extends Component{
    render() {
      return(
        <div id="aboutContainer">
          <div id="aboutContent">
          <h2 id="aboutTitle">&nbsp;About My Pok&#233;mon API React App&nbsp;</h2><br></br><br></br>
    
            <div id="aboutPlayContainer">
              <div className="aboutTitles">Play</div><br></br>
              <div id="aboutPlayContent">
                <ul>
                <li>Guess the correct Pok&#233;mon to "catch" them and see your progress in the Pok&#233;mon page.</li>
                </ul>
              </div>
            </div>
    
            <br></br>
    
            <div id="aboutPokedexContainer">
            <div className="aboutTitles">Pok&#233;dex</div><br></br>
              <div className="aboutContents">
                <ul>
                  <li>A random Pok&#233;mon is generated when page refreshes</li><br></br>
                  <li>Running total of 898 Pok&#233;mon from Generations I, II, III, VI, V, VI, VII, & VIII</li><br></br>
                  <li>The Pok&#233;dex was made entirely from CSS with 65+ layers</li><br></br>
                  <li>The Pok&#233;dex sprites &#x00028;images&#x00029; are rendered from the api</li>
                </ul>
              </div>
            </div>
    
            <br></br>
    
            <div id="aboutPokemonContainer">
            <div className="aboutTitles">Pok&#233;mon</div><br></br>
              <div className="aboutContents">
                <ul>
                  <li>Pok&#233;mon listed are only from Generation I</li><br></br>
                  <li>Can you "catch" all 151 Pok&#233;mon from the Play page ?</li>
                </ul>
              </div>
            </div>
    
            <br></br>
    
            <div id="theAboutContainer">
            <div className="aboutTitles">More . . .</div><br></br>
              <div className="aboutContents">
                <ul>
                  <li>Pok&#233;mon was released in 1996 and celebrates their 25th anniversary in 2021 !</li><br></br>
                  <li>Header and background images are from Google Images</li><br></br>
                  <li>The RESTful Pok&#233;mon API used in this app can be found from <a href="https://pokeapi.co/">https://pokeapi.co/</a></li>
                </ul>
              </div>
            </div><br></br><br></br>
            
          </div>
        </div>
      );
      }
    }

    export default About