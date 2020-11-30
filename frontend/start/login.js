import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import "./forgotpassword"
import "./../main/home"
import axios from 'axios';



export default class Login extends Component {
  constructor(props) {
    super(props);
    
    //default state
    this.state = {
        username: '',
        password: '',

        array: [],


        navigate: false,
        referrer: null,
    }
    //bind methods to this object
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  onChangeUsername(e) {
    this.setState({
        username: e.target.value
    });
  }

  onChangePassword(e) {
      this.setState({
          password: e.target.value
      });
  }

  getDetails = async () => {
    try{
      const result = await axios.get('http://localhost:4000/fetch', {
          params: {
            username: this.state.username,
            password: this.state.password
          }
      }).then(res => {
        if (res.data){
          this.setState({
            referrer: "/home"
          });
          this.props.toggleLogin(res.data.username, res.data._id)
        }else{
          alert("Invalid Username or Password. Please Try Again");
        }
      })
    }catch(err){
      console.error(err)
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.getDetails();
  }
  
  
  
  render() {
    let {referrer} = this.state;
    if (referrer) 
      return <Redirect push to={{pathname: referrer}}  /> 

      return (
          <div>
            <form onSubmit={this.onSubmit} className="Login">
              <label id='username'>Username</label>
              <input type='text' id='username' value={this.state.username} onChange={this.onChangeUsername} required/>
              <label id='password'>Password</label>
              <input type='text' id='password' value={this.state.password} onChange={this.onChangePassword} required/>
              <input type='submit' value='Login' className='submit'/>
            </form>
            <Link className="Link" to="/forgotpassword" >Forgot Your Password?</Link>
          </div>
      )
  }
}

export {Login}