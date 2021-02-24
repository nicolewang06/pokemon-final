import React from 'react'
import axios from 'axios'

//const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon/"
const deploySite = "http://localhost:8080/pokemon/"

class MyPokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editPokemon = this.editPokemon.bind(this);
    this.sendEditedPokemon = this.sendEditedPokemon.bind(this);
  }
  
  // async getPokemon() {
  //   try {
  //     const res = await axios.get(deploySite);
  //     this.setState({ pokemon: res.data })
  //   } catch(e) {
  //     console.error(e);
  //   }
  // }

  // componentDidMount() {
  //   this.getPokemon();
  // }
  
  handleChange(e){
    const { nickname, value } = e.target;
    this.setState( { [nickname]: value } )
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    const { nickname } = this.state;
    const pokemon = { nickname };
    try {
      const res = await axios.post(deploySite, pokemon);
      console.log(res.data);

      const updateRes = await axios.get(deploySite);
      this.setState( { pokemon: updateRes.data } )
    } catch(e) {
      console.error (e);
    }
  }
  
  selectTest(selectedPokemon) {
    this.setState ( { selectedPokemon } );
  }
  
  editPokemon(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedPokemon: { ...this.state.selectedPokemon, [name]: value } } );
  }
  
  async sendEditedPokemon(e) {
    e.preventDefault();
    try {
      this.setState({ selectedPokemon: null })
      const editedPokemon = this.state.selectedPokemon; 
      this.props.updatePokemon(editedPokemon)
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="pokemonCardTest">
          <div className="pokemonBackgroundTest" key={ this.props.data.id }>
            <img id="pokemonImage" src= {this.props.data.imageUrl + ".png"} alt="" width="150px" />
            <div id="pokemonNumTest">#{this.props.data.pokemonNum}</div>
              <div className="pokemonContent">
                <div id="pokemonNameContent">
                <div id="delete" onClick={ () => this.props.deletePokemon(this.props.data.id) }>❌</div>
                <div id="edit" onClick={ () => this.selectTest(this.props.data) }>✏️</div>
                </div >
              </div>
            <div id="pokemonName">
                {this.props.data.nickname ? this.props.data.nickname : this.props.data.pokemonName}
            </div>
          </div>
      <hr></hr>
        {this.state.selectedPokemon && <form className="pokemon-edit-form"
          onChange={ this.editPokemon}
          onSubmit = {this.sendEditedPokemon}>
          <label>
            nickname:
            <input type="text" name="nickname" defaultValue={ this.state.selectedPokemon.pokemonName } />
          </label>
          <input type="submit" />
        </form>}
      </div>
    )
  }
}
  
export default MyPokemon