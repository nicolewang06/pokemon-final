import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

//const img = "https://pokeres.bastionbot.org/images/pokemon/"

class Pokemon extends Component {
    constructor(props) {
      super(props);
  
      this.state = { data: [], isEditToggled: false}
      this.deletePokemon = this.deletePokemon.bind(this)

      this.handleChange = this.handleChange.bind(this)
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
              {
              this.state.data && this.state.data.map(data => (
      <SinglePokemon data = {data} deletePokemon = {this.deletePokemon} submitEditedWine = {this.submitEditedWine } />
                  
                  
              ))
              }
              <button onClick={ () => this.selectWine(this.props.data) }>Edit Wine</button>
              <Wines />
            </div>
        </div>
      )
    }
}




class SinglePokemon extends Component{
  constructor(props){
    super(props)

    this.state = {isEditToggled: false}
    this.selectWine = this.selectWine.bind(this)
    this.submitEditedWine = this.submitEditedWine.bind(this)
    this.editWine = this.editWine.bind(this)
  }

  selectWine(selectedWine) {
    this.setState ( { selectedWine } );
    !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});

    //console.log(wine);
  }

  editWine(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedWine: { ...this.state.selectedWine, [name]: value } } );
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

  async submitEditedWine(e) {
    //alert("refresh page to see changes")
    //e.preventDefault();
    // const nickname = document.getElementById("nickname").value;
    // const editPokemon = {...this.state.data[0], nickname: nickname };
    //
    // ------------fix update to toggle off edit
    // when editing 2nd , 1st changes (array thing)
    //
    const {nickname } = this.state;
    const wine = {nickname};

    try {
        const editedWine = this.state.selectedWine;
        const res = await axios.patch('http://localhost:8080/pokemon/', editedWine);
        const updateRes = await axios.get('http://localhost:8080/pokemon/');
        this.setState({ data: updateRes.data, isEditToggled: false});
        //window.location.reload(false);
      } catch(e) {
        console.error(e, e.message);
      }
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
                <div id="edit" onClick={ (e) => this.selectWine() }>
                  ✏️
                </div>
                { this.state.isEditToggled && this.state.selectedWine &&
                  <form  onChange={ this.editWine} onSubmit = { this.submitEditedWine } >
                    <input id="nickname" type="text" size="10" defaultValue={this.props.data.pokemonName}/>
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
const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/779738/wines/'
const POKEMONURL = 'http://localhost:8080/pokemon'
class Wines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectWine = this.selectWine.bind(this);
    this.editWine = this.editWine.bind(this);
    this.submitEditedWine = this.submitEditedWine.bind(this);
  }

  async getWines() {
    try {
      const res = await axios.get(POKEMONURL);
      //console.log(res.data)
      this.setState({ wines: res.data })
    } catch(e) {
      console.error(e);
    }
  }
  componentDidMount() {
    this.getWines();
  }

  handleChange(e){
    /*  DESTRUCTING >>
    e.target.name
    e.target.value */    
    const { nickname, value } = e.target;
    //console.log(name, value)
    this.setState( { [nickname]: value } )
  }

  async handleSubmit(e) {
    //console.log('something')
    /* DESTRUCTING >>
    this.state.name
    this.state.year
    this.state.grapes */
    e.preventDefault();
    const { nickname } = this.state;
    const wine = { nickname };
    try {
      const res = await axios.post(POKEMONURL, wine);
      console.log(res.data);

      const updateRes = await axios.get(POKEMONURL);
      this.setState( { wines: updateRes.data } )
    } catch(e) {
      console.error (e);
    }
    //console.log( { name, year, grapes, country, region, description, picture, price } );
    //const lastName = "wang";
    //console.log( { lastName })
    // const obj = { name: 'nicole', lastName: "wang" }
  }

  async handleDelete(id) {
    console.log(WINES_URL + id);
    try{
      const res = await axios.delete(WINES_URL + id); // target wine id
      console.log(res.data);

      const updateRes = await axios.get(WINES_URL);
      this.setState( { wines: updateRes.data } )
    } catch(e) {
      console.error(e.message)
    }
  }

  selectWine(selectedWine) {
    this.setState ( { selectedWine } );
    //console.log(wine);
  }

  editWine(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedWine: { ...this.state.selectedWine, [name]: value } } );
    //console.log(e.target.value);
  }

  async submitEditedWine(e) {
    e.preventDefault();
    try {
      const editedWine = this.state.selectedWine; // this obj has an id
      console.log(editedWine)
      // to send our patch to url + /id
      //const focusWine = WINES_URL + editedWine.id
      const res = await axios.patch(POKEMONURL, editedWine);

      const resRefresh = await axios.get(POKEMONURL);
      this.setState( { wines: resRefresh.data } );
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="wines">
        <ul>
          {/* render info */}
          {
            this.state.wines && this.state.wines.map(wine => (
              <li key={ wine.id }>
                { wine.nickname } //
                { wine.pokemonName }: # { wine.pokemonNum }
                <button onClick={ () => this.handleDelete(wine.id) }>Delete wine</button>
                <button onClick={ () => this.selectWine(wine) }>Edit Wine</button>
              </li>
              ))
          }
        </ul>
        <form className="new-wine-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Wine Name:
            <input type="text" name="nickname" />
          </label>

          <input type="submit" />
        </form>

        <hr></hr>
            { /* we want to show the form */ }
            { /* only after we select a wine */ }
            { /* if this.state.selectedWine exists */ }
            { /* render this form below */ }
            { /* this.state.selectedWine && formBelow */ }
        { 
        this.state.selectedWine && <form className="wine-edit-form"
          onChange={ this.editWine}
            onSubmit = {this.submitEditedWine}>
          <label>
            Wine Name:
            <input type="text" name="nickname" defaultValue={ this.state.selectedWine.pokemonName } />
          </label>

          <input type="submit" />
        </form>
  }
    </div>
    )
  }
}


export default Pokemon