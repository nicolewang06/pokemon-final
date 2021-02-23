import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

//const img = "https://pokeres.bastionbot.org/images/pokemon/"
const postgresDB = "http://localhost:8080/pokemon"
const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon/"

class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], isEditToggled: false, selectedTest: []}
    this.deletePokemon = this.deletePokemon.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
    this.selectPokemon = this.selectPokemon.bind(this);
}

  async componentDidMount() {
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
      const res = await axios.delete(deploySite + id);
      //console.log(res.data);
      //alert("we'll meet again");
      const updateRes = await axios.get(deploySite);
        this.setState({ data: updateRes.data});
        console.log(this.state.data)
    } catch(e) {
      console.error(e, e.message);
    }
  }

  selectPokemon(selectedPokemon) {
    this.setState ( { selectedPokemon, isEditToggled:true } );
    !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});

    //console.log(wine);
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
            <div>
  <SinglePokemon data = {data} deletePokemon = {this.deletePokemon} submitEditedWine = {this.submitEditedWine } />  
  <button onClick={ () => this.selectPokemon(data) }>Edit Test</button>
</div>
          ))
          }
          <Testing />
        </div>
    </div>
  )
}
}




class SinglePokemon extends Component{
  constructor(props){
    super(props)

    this.state = {isEditToggled: false}
    this.selectPokemon = this.selectPokemon.bind(this)
    this.submitEditedPokemon = this.submitEditedPokemon.bind(this)
    this.editPokemon = this.editPokemon.bind(this)
  }

  selectPokemon(selectedPokemon) {
    this.setState ( { selectedPokemon, isEditToggled:true } );
    !this.state.isEditToggled ? this.setState({isEditToggled: true}) : this.setState({isEditToggled: false});

    //console.log(wine);
  }

  editPokemon(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedPokemon: { ...this.state.selectedPokemon, [name]: value } } );
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
  async submitEditedPokemon(e) {
    //alert("refresh page to see changes")
    //e.preventDefault();
    // const nickname = document.getElementById("nickname").value;
    // const editPokemon = {...this.state.data[0], nickname: nickname };
    //
    // ------------fix update to toggle off edit
    // when editing 2nd , 1st changes (array thing)
    //
    const {nickname } = this.state;
    const pokemon = {nickname};

    try {
        const editedPokemon = this.state.selectedPokemon;
        const res = await axios.patch(deploySite, editedPokemon);
        const updateRes = await axios.get(deploySite);
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
                <div id="edit" onClick={ () => this.selectPokemon() }>
                  ✏️
                </div>
                { this.state.isEditToggled && this.state.selectedPokemon &&
                  <form  onChange={ this.editPokemon} onSubmit = { this.submitEditedPokemon } >
                    <input id="nickname" type="text" size="10" defaultValue={this.state.selectedPokemon.pokemonName}/>
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

//const POKEMONURL = 'http://localhost:8080/pokemon'
class Testing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editTest = this.editTest.bind(this);
    this.submitEditedTest = this.submitEditedTest.bind(this);
  }

  async getTests() {
    try {
      const res = await axios.get(deploySite);
      this.setState({ tests: res.data })
    } catch(e) {
      console.error(e);
    }
  }
  componentDidMount() {
    this.getTests();
  }

  handleChange(e){
    const { nickname, value } = e.target;
    this.setState( { [nickname]: value } )
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { nickname } = this.state;
    const test = { nickname };
    try {
      const res = await axios.post(deploySite, test);
      console.log(res.data);

      const updateRes = await axios.get(deploySite);
      this.setState( { tests: updateRes.data } )
    } catch(e) {
      console.error (e);
    }
  }

  selectTest(selectedTest) {
    this.setState ( { selectedTest } );
  }


  editTest(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedTest: { ...this.state.selectedTest, [name]: value } } );
  }

  async submitEditedTest(e) {
    e.preventDefault();
    try {
      const editedTest = this.state.selectedTest; 
      console.log(editedTest)
      const res = await axios.patch(deploySite, editedTest);

      const resRefresh = await axios.get(deploySite);
      this.setState( { tests: resRefresh.data } );
    } catch(e) {
      console.error(e);
    }
  }



  render() {
    return (
      
        <div className="pokemonCardTest">
          {
            this.state.tests && this.state.tests.map(test => (
              <div className="pokemonBackgroundTest" key={ test.id }>
                <img id="pokemonImage" src= {test.imageUrl + ".png"} alt="" width="150px" />
                <div id="pokemonNumTest">#{test.pokemonNum}</div>
                <div className="pokemonContent">

                  <div id="pokemonNameContent">
                  <div id="delete" onClick={ () => this.deletePokemon(test.id) }>❌</div>
                 { console.log(test.id)}
                  <div id="edit" onClick={ () => this.selectTest(test) }>✏️</div>
                  </div >
                </div>
                { !this.state.isEditToggled && <div id="pokemonName">
                    {test.nickname ? test.nickname : test.pokemonName}
                </div>}
                
              </div>
              ))
          }
       

        <hr></hr>

        { 
        this.state.selectedTest && <form className="test-edit-form"
          onChange={ this.editTest}
            onSubmit = {this.submitEditedTest}>
          <label>
            nickname:
            <input type="text" name="nickname" defaultValue={ this.state.selectedTest.pokemonName } />
          </label>

          <input type="submit" />
        </form>
  }
    </div>
    )
  }
}


export default Pokemon