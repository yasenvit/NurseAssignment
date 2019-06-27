import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';



class Nav extends Component {
    render() {
        return (
        <div>
        <ul>
          <li><Link class="active" to="/">HOME</Link></li>
          <li><Link to="/assessor">ASSESSOR PROFILE</Link></li>
          <li><Link to="/assignment">ASSIGNMENT</Link></li>
        </ul>   
      </div>         
        )
    }
}

export default Nav