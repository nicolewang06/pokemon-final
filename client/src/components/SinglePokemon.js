import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

//const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon/"
const deploySite = "http://localhost:8080/pokemon/"


class SinglePokemon extends Component{
    constructor(props){
      super(props)
  
      this.state = {
          nickname: this.props.data.nickname,
          isEditToggled: false
      }
      this.selectPokemon = this.selectPokemon.bind(this)
      this.submitEditedPokemon = this.submitEditedPokemon.bind(this)
      this.editPokemon = this.editPokemon.bind(this)
    //   this.selectedPokemon = this.selectedPokemon.bind(this)
    }
  
    selectPokemon() {
      this.setState ( { isEditToggled:true } );
      !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});
  
      //console.log(wine);
    }
  
    editPokemon(e) {
        const { nickname, value } = e.target;
        this.setState({ 
            nickname: value
        });
      //console.log(e.target.value);
    }
  
    // async toggleEdit() {
    //   // let edit = document.getElementById("myDIV");
    //   // let name = document.getElementById("pokemonName");
    //   // edit.style.display = "block";
    //   // name.style.display = "none";
    //   this.setState ( { selectedWine } );
    //   !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});
  
    // }
  async submitEditedPokemon() {
      //alert("refresh page to see changes")
      //e.preventDefault();
      // const nickname = document.getElementById("nickname").value;
      // const editPokemon = {...this.state.data[0], nickname: nickname };
      //
      // ------------fix update to toggle off edit
      // when editing 2nd , 1st changes (array thing)
      //
    //   const {nickname} = this.state;
    //   const pokemon = {nickname};
  
    try {

      
      const res = await axios.post(deploySite, {
        id: this.props.data.id,
        nickname: this.state.nickname
      });
      this.setState({
        isEditToggled: false
      });
      
    } catch(e) {
      console.error(e, e.message);
    }
  }
  
  
    render(){
      return(
  
        <div className="pokemonCard" key={this.props.data.id}>  
          <div className="pokemonBackground" >
              <form><div id="delete" onClick={ () => this.props.deletePokemon(this.props.data.id) }>❌</div></form>
              <img id="pokemonImage" src= {this.props.data.imageUrl + ".png"} alt="" width="150px" />
              <div id="pokemonNum">#{this.props.data.pokemonNum}</div>
          </div> 
          <div className="pokemonContent">
              <div id="pokemonNameContent">
                  <div id="edit" onClick={ () => this.selectPokemon() }>
                    ✏️
                  </div>
                  { this.state.isEditToggled &&
                    <form onChange={ this.editPokemon} onSubmit = { this.submitEditedPokemon } >
                      <input id="nickname" type="text" size="10" defaultValue={this.state.nickname ? this.state.nickname : this.props.data.pokemonName}/>
                      <input type="submit" value="update"/>
                    </form>
                  }
                  { !this.state.isEditToggled && <div id="pokemonName">
                      {this.props.data.nickname ? this.props.data.nickname : this.props.data.pokemonName}
                  </div>}
              </div>
          </div>
      </div>
  
      )
    }
  }

export default SinglePokemon