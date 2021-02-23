import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Testing from './Testing'
import SinglePokemon from './SinglePokemon'


//const img = "https://pokeres.bastionbot.org/images/pokemon/"
const deploySite = "http://localhost:8080/pokemon/"
// const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon/"


class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], isEditToggled: false }
    this.deletePokemon = this.deletePokemon.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
    // this.selectPokemon = this.selectPokemon.bind(this);
  }

  async componentDidMount() {
    // bfre page loads, have this ready
    try{
      const {data} = await axios.get(deploySite)
      this.setState ( { data: data } )
      //console.log(data)
    } catch(error) {
      console.error(error.message);
    }
  }

  async deletePokemon(id) {
    try {
      await axios.delete(deploySite + id);
      //console.log(res.data);
      //alert("we'll meet again");
      // const {data} = await axios.get(deploySite)
      // this.setState ( { data: data } )
      // console.log(this.state.data)
      window.location.reload(false);
    } catch(e) {
      console.error(e, e.message);
    }
  }

  // selectPokemon(selectedPokemon) {
  //   this.setState ( { selectedPokemon, isEditToggled: true } );
  //   !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});

  // }

  handleChange(e){
    /*  DESTRUCTING >>
    e.target.name
    e.target.value */    
    const { nickname, value } = e.target;
    //console.log(name, value)
    this.setState( { [nickname]: value } )
  }
  render() {
    return(
      <div id = "holder">
        <div className="pokemonCardContainer">  
          {/* {this.state.data && this.state.data.map(data => (
            <div>
              <SinglePokemon data={data} deletePokemon={this.deletePokemon} submitEditedPokemon={this.submitEditedPokemon } />
            </div>))
          } */}
          <Testing deletePokemon={this.deletePokemon}/>
        </div>
      </div>
    )
  }
}

//const POKEMONURL = 'http://localhost:8080/pokemon'


export default Pokemon