import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import  Intro from "./frontend/components/start/intro";
import ForgotPassword from './frontend/components/start/forgotpassword';
import Home from "./frontend/components/main/home";
import Profile from "./frontend/components/main/profile";
import "./App.scss"
import Logo from "./images/Food_Logo.PNG"
import Recipes from './frontend/components/main/recipes';
import Recipe from './frontend/components/main/recipe';
import AddRecipe from './frontend/components/main/addrecipe';
import OtherRecipe from './frontend/components/main/otherrecipe';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoginActive: false,
      username: "",
      id: ""
    }
    this.toggleLogin.bind(this)
  }  
  
 
  toggleLogin=(name, id)=>{
    this.setState({
      isLoginActive: !this.state.isLoginActive,
      username: name,
      id: id
    })
  }

  
  render() {
    
    return (
        <Router>
          {this.state.isLoginActive === true && (
            
            <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                  <img className="logo" src={Logo} alt="Logo"/>
                  <li>
                    <input className="search" type="text" placeholder="Search for Recipes"></input>
                  </li>
                  <li className="navbar-item">
                    <Link to="/home" className="nav-link">Home</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/recipes" className="nav-link">Recipes</Link>
                  </li>
                  
               
                  <li className="navbar-item">
                    <Link to="/recipes" className="nav-link">About</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/recipes" className="nav-link">Contact</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/" className="nav-link" onClick={() => this.toggleLogin("","")} >Logout</Link>
                  </li>
                </ul>
            </nav>
          </div>
          )}
            <Route exact path="/" component={() => <Intro toggleLogin={this.toggleLogin}/>}/> 
            <Route exact path="/forgotpassword" component={ForgotPassword}/>
            <Route exact path="/home" component={() => <Home id={this.state.id} username={this.state.username} />}/>
            <Route exact path="/profile" component={() => <Profile id={this.state.id} username={this.state.username} />}/>
            <Route exact path="/recipes" component={() => <Recipes id={this.state.id} />}/>
            <Route exact path="/recipe" component={(props) => <Recipe id={this.state.id} {...props} />}/>
            <Route exact path="/addrecipe" component={() => <AddRecipe id={this.state.id} />}/>
            <Route exact path="/otherrecipe" component={(props) => <OtherRecipe id={this.state.id} {...props} />}/>
        </Router>
    );
  }
}

export {App};
