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


export default class Profile extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          profilePicture: "",
          editMode: false,
          username: "",
          fullname: "",
          phone: "",
          email: "",
          location: "",
          about: ""
        };
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
                      phone: res.data.phone,
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
    }

    toggleEdit = () => {
      this.setState({
        editMode: true
      })
    }

    render() {
        return (
          
          <div className="container">
              <div className="edit">
                <img className={this.state.editMode ? "no-edit-icon" : "edit-icon"} title="Edit Profile" src={EditIcon} onClick={() => this.toggleEdit()}></img>
              </div>
              <div className="profile-display">

                <div className="img-holder">
                  <label className="pic-label" htmlFor="file-input">
                    <img className="img" src={this.state.profilePicture} accept="image/*" />
                  </label>

                  <input id="file-input" type="file" onChange={this.imageHandler} disabled/>
                </div>
              
                <div className="edit-info">
                   <img className="username-icon" src={UsernameIcon}></img>
                   <input type="text"  className="name" defaultValue={this.state.username} disabled></input>

                   <img className="fullname-icon" src={FullNameIcon}></img>
                   <input type="text" className="fullname" defaultValue={this.state.fullname} disabled></input>

                   <img className="email-icon" src={EmailIcon}></img>
                   <input type="text" className="email" defaultValue={this.state.email} disabled></input>

                   <img className="phone-icon" src={PhoneIcon}></img>
                   <input type="text" className="phone" defaultValue={this.state.phone} disabled></input>

                   <img className="location-icon" src={LocationIcon}></img>
                   <input className="location" defaultValue={this.state.location} disabled></input>
                </div>
              </div>
              <div className="about-section">
                <div className="about">About Me:</div>
                <input type="text" className="about-text" defaultValue={this.state.about} disabled></input>
              </div>
              <div className="stats-section">
                <div className="stats">Your Stats</div>
              </div>
          </div>
        )
    }
}

export {Profile}