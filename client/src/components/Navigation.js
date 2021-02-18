import React, {Component} from 'react'
import {Link} from "react-router-dom";

  class Navigation extends Component {
  
    render() {
      return(
        <div className="header">
        <div className="nav">
        <Link to="/play">Play</Link>&nbsp; || &nbsp;<Link to="/Pokedex">Pok&#233;dex</Link>&nbsp; || &nbsp;<Link to="/pokemon">Pok&#233;mon</Link>&nbsp; || &nbsp;<Link to="/">About</Link>
      </div>
      </div>
      );
    }
  }

  export default Navigation