import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./register.scss"
import ForgotPassword from "./forgotpassword"
import axios from 'axios';
import Picture from "./../../../images/Default-Pic.png";

export default class Register extends Component {
  constructor(props) {
    super(props);
    //default state
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      fullname: '',
      location: '',
      picture: Picture,
      about: '',

      referrer: null,
    }

    //bind methods to this object
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
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

  onChangeEmail(e) {
    this.setState({
        email: e.target.value
    });
  }

  onChangePhone(e) {
      this.setState({
          phone: e.target.value
      });
  }

  onSubmit(e) {
    e.preventDefault();
    alert("Registration Completed")
    

    const registration = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      fullname: this.state.fullname,
      location: this.state.location,
      about: this.state.about
    }

    axios.post('http://localhost:4000/add', registration)
            .then(res => console.log(res.data));

    this.props.resetPage()
    this.setState({
      referrer: "/"
    })
  }
    

    render() {
      let {referrer} = this.state;
      if (referrer) return <Redirect to={referrer} /> 
        return (
          <form onSubmit={this.onSubmit} >
              <p>Please fill in the registration details</p>
              <input type="text" className="form-control" placeholder="Enter Username" value={this.state.username} onChange={this.onChangeUsername} required/>
              <input type="password" className="form-control" placeholder="Enter Password" value={this.state.password} onChange={this.onChangePassword} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" title="At least 1 Uppercase, 1 Lowercase, and 1 Number" required/>
              <input type="email" className="form-control" placeholder="Enter Email" value={this.state.email} onChange={this.onChangeEmail} required />
              <input type="tel" className="form-control" placeholder="Enter Phone Number: 888-888-8888" value={this.state.phone} onChange={this.onChangePhone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  title="Ten digits code: 888-888-8888" required/>
              <input type="checkbox" className="checkbox" required/>
              <p className="acknowledgement">
                I acknowledged that I understand the terms when using this website</p>
        <input type='submit'  value='Register' className='submit' />

            </form>
        )
    }
}