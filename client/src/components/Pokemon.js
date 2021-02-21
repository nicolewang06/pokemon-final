import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

//const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Pokemon extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [], isEditToggled: false }
      this.deletePokemon = this.deletePokemon.bind(this)
      this.handleEditSubmit = this.handleEditSubmit.bind(this)
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
          //alert("we'll meet again");
          const updateRes = await axios.get('http://localhost:8080/pokemon/');
            this.setState({ data: updateRes.data});
            console.log(this.state.data)
        } catch(e) {
          console.error(e, e.message);
        }
      }

      async handleEditSubmit(e) {
        //alert("refresh page to see changes")
        //e.preventDefault();
        const nickname = document.getElementById("nickname").value;
        const editPokemon = {...this.state.data[0], nickname: nickname };
        //
        // ------------fix update to toggle off edit
        // when editing 2nd , 1st changes (array thing)
        //

        try {
            const res = await axios.patch('http://localhost:8080/pokemon/', editPokemon);
            const updateRes = await axios.get('http://localhost:8080/pokemon/');
            this.setState({ data: updateRes.data, isEditToggled: false});
            window.location.reload(false);
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
                  <SinglePokemon data = {data} deletePokemon = {this.deletePokemon} handleEditSubmit = {this.handleEditSubmit }/>
                  
              ))
              }
            </div>
        </div>
      )
    }
}




class SinglePokemon extends Component{
  constructor(props){
    super(props)

    this.state = {isEditToggled: false}
  }

  async toggleEdit() {
    // let edit = document.getElementById("myDIV");
    // let name = document.getElementById("pokemonName");
    // edit.style.display = "block";
    // name.style.display = "none";
    
    !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});
  }

  render(){
    return(

      <div className="pokemonCard" key={this.props.data.id}>  
        <div className="pokemonBackground" >
            <form><div id="delete" onClick={ (e) => this.props.deletePokemon(this.props.data.id) }>❌</div></form>
            <img id="pokemonImage" src= {this.props.data.imageUrl + ".png"} alt="" width="150px" />
            <div id="pokemonNum">#{this.props.data.pokemonNum}</div>
        </div> 

        <div className="pokemonContent">
            <div id="pokemonNameContent">
                <div id="edit" onClick={ (e) => this.toggleEdit() }>
                  ✏️
                </div>
                { this.state.isEditToggled && <div id="myDIV">
                  <form onSubmit = { this.props.handleEditSubmit } >
                    <input id="nickname" type="text" size="10" defaultValue={this.props.data.pokemonName}/>
                    <input type="submit" value="update"/>
                  </form>
                </div>}
                { !this.state.isEditToggled && <div id="pokemonName">
                    {this.props.data.nickname ? this.props.data.nickname : this.props.data.pokemonName}
                </div>}
            </div>
        </div>
    </div>

    )
  }
}

export default Pokemon