import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.scss";
import UsernameIcon from "./../../../images/UsernameIcon.png";
import FullNameIcon from "./../../../images/FullNameIcon.png";
import EmailIcon from "./../../../images/EmailIcon.png";
import LocationIcon from "./../../../images/LocationIcon.png";
import PhoneIcon from "./../../../images/PhoneIcon.png";
import EditIcon from "./../../../images/EditIcon.png";
import axios from 'axios';
import fs from 'fs';


export default class Profile extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          id: this.props.id,
          profilePicture: "",
          editMode: false,
          username: "",
          fullname: "",
          phone: "",
          email: "",
          location: "",
          about: "",
          disabled: true
        };

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeAbout = this.onChangeAbout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
    getDetails = async (id) => {
        try{
            const result = await axios.get('http://localhost:4000/fetchid', {
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data){
                  var base64Flag = "data:image/jpeg;base64,";
                  var imageStr = this.arrayBufferToBase64(
                    res.data.picture.data.data
                  ); 
                  this.setState({
                      profilePicture: base64Flag+imageStr,
                      username: res.data.username,
                      fullname: res.data.fullname,
                      phone: res.data.phone.toString().slice(0,3) + "-" + res.data.phone.toString().slice(3,6) + "-" + res.data.phone.toString().slice(6),
                      email: res.data.email,
                      location: res.data.location,
                      about: res.data.about
                  })
                }
            })
        }catch(err){
            console.error(err)
        }
    }

    componentDidMount(prevProps) {
        const { id } = this.state;
        this.getDetails(this.props.id);
    }

    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    }
    
    imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2){
          this.setState({profilePicture: reader.result})
        }
      }
      if (e.target.files[0]){      
        reader.readAsDataURL(e.target.files[0])
      }
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("_id", this.state.id);
      axios.post('http://localhost:4000/profile/upload/'+this.props.id, data).then(res =>{
        console.log(res.statusText);
      });
    }

    toggleEdit = () => {
      this.setState({
        editMode: true
      })

    }

    onChangeFullName(e) {
      this.setState({
          fullname: e.target.value
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

    onChangeLocation(e) {
      this.setState({
          location: e.target.value
      });
    }

    onChangeAbout(e) {
      this.setState({
          about: e.target.value
      });
    }


    onSubmit(e) {
      e.preventDefault();
      const profile = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        fullname: this.state.fullname,
        location: this.state.location,
        about: this.state.about
      }
      

      axios.post('http://localhost:4000/profile/add/'+this.props.id, profile)
            .then(res => console.log(res.data));


      this.setState({
        editMode: false
      })
    }
    
    closeButton=()=>{
      
      this.setState({
        editMode: false
      })
    }
    render() {
        let editMode = this.state.editMode;
        
        return (
          
          <div className="container">
            <button className={editMode ? "profileClose" : "no-profileClose"} onClick={this.closeButton}></button>
            <form onSubmit={this.onSubmit} className="form" >
              <div className="edit">
                <img className={editMode ? "no-edit-icon" : "edit-icon"} title="Edit Profile" src={EditIcon} onClick={() => this.toggleEdit()}></img>
              </div>
              <div className="profile-display">

                <div className="img-holder">
                  <label className="pic-label" htmlFor="file-input">
                    <img className={editMode ? "edit-img" : "img"} src={this.state.profilePicture} accept="image/*" />
                  </label>

                  <input id="file-input" type="file"  onChange={this.imageHandler} disabled={!this.state.editMode}/>
                </div>
              
                <div className="edit-info">
                   <img className="username-icon" src={UsernameIcon}></img>
                   <input type="text" className="name" defaultValue={this.state.username} disabled></input>

                   <img className="fullname-icon" src={FullNameIcon}></img>
                   <input type="text" className={editMode ? "edit-fullname" : "fullname"} placeholder="Full Name" defaultValue={this.state.fullname} onChange={this.onChangeFullName} disabled={!this.state.editMode}></input>

                   <img className="email-icon" src={EmailIcon}></img>
                   <input type="email" className={editMode ? "edit-email" : "email"} placeholder="Email" defaultValue={this.state.email} onChange={this.onChangeEmail} required disabled={!this.state.editMode}></input>

                   <img className="phone-icon" src={PhoneIcon}></img>
                   <input type="tel" className={editMode ? "edit-phone" : "phone"} placeholder="Phone Number (888-888-8888)" defaultValue={this.state.phone} onChange={this.onChangePhone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  title="Ten digits code: 888-888-8888" required disabled={!this.state.editMode}></input>

                   <img className="location-icon" src={LocationIcon}></img>
                   <input className={editMode ? "edit-location" : "location"}  placeholder="Address" defaultValue={this.state.location} onChange={this.onChangeLocation} disabled={!this.state.editMode}></input>
                </div>
              </div>
              <div className="about-section">
                <div className="about">About Me:</div>
                <textarea className={editMode ? "edit-about-text" : "about-text"} placeholder="Write a paragraph about yourself" defaultValue={this.state.about} onChange={this.onChangeAbout} disabled={!this.state.editMode}></textarea>
              </div>
              <input type='submit'  value='Save Changes' className={editMode ? "profile-submit" : "no-profile-submit"} />
              </form>
              <div className="stats-section">
                <div className="stats">Your Stats</div>
              </div>
          </div>
        )
    }
}

export {Profile}