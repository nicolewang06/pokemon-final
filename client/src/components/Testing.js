import React from 'react'
import axios from 'axios'

//const deploySite = "https://fast-falls-09879.herokuapp.com/pokemon/"
const deploySite = "http://localhost:8080/pokemon/"

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
        {this.state.tests && this.state.tests.map(test => (
          <div className="pokemonBackgroundTest" key={ test.id }>
            <img id="pokemonImage" src= {test.imageUrl + ".png"} alt="" width="150px" />
            <div id="pokemonNumTest">#{test.pokemonNum}</div>
              <div className="pokemonContent">
                <div id="pokemonNameContent">
                <div id="delete" onClick={ () => this.props.deletePokemon(test.id) }>❌</div>
                <div id="edit" onClick={ () => this.selectTest(test) }>✏️</div>
                </div >
              </div>
            {!this.state.isEditToggled && <div id="pokemonName">
                {test.nickname ? test.nickname : test.pokemonName}
            </div>}
          </div>
        ))}
      <hr></hr>
        {this.state.selectedTest && <form className="test-edit-form"
          onChange={ this.editTest}
          onSubmit = {this.submitEditedTest}>
          <label>
            nickname:
            <input type="text" name="nickname" defaultValue={ this.state.selectedTest.pokemonName } />
          </label>
          <input type="submit" />
        </form>}
      </div>
    )
  }
}
  
export default Testing